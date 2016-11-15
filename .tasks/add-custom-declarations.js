const fs = require("fs");
const glob = require("glob");
const mkdir = require("mkdirp");
const parse = require("path").parse;
const resolve = require("path").resolve;
const root = process.cwd();

const collections = [
    {
        folder: "enums",
        files: glob.sync(resolve(root, "typings/enums/**/*.d.ts")),
        exports: [],
    },
    {
        folder: "models",
        files: glob.sync(resolve(root, "typings/models/**/*.d.ts")),
        exports: [],
    },
    {
        folder: "options",
        files: glob.sync(resolve(root, "typings/options/**/*.d.ts")),
        exports: [],
    }
]
let mainDefinitionText = fs.readFileSync(resolve(root, "dist/index.d.ts")).toString();

collections.forEach((collection, index) => {
    const exportName = collection.folder.substring(0, 1).toUpperCase() + collection.folder.substring(1);
    const dir = resolve(root, "dist/typings", collection.folder);

    mkdir.sync(dir);

    collection.files.forEach(file => {
        const text = fs.readFileSync(file).toString();
        const filename = parse(file).base;

        try {
            const lines = text.replace(/(\r\n)|\r|\n/g, '\n').split(/\n+/g);

            collection.exports.push(...lines.reduce((result, line) => {
                const matches = /export +(?:interface|type|class) +(\w*) *(?:{|=|extends|implements)/ig.exec(line);

                // When executing a regex, the matches are all array results except for 0.
                if (matches && matches.length > 1) {
                    result.push(`export { ${matches.slice(1).join(", ")} } from "./${filename.split(/\.d\.ts/)[0]}";`);
                }

                return result;
            }, []));
        } catch (e) {
            console.warn(`Failed to find exports in ${file}`, e);
        }

        fs.writeFileSync(resolve(root, "dist/typings", collection.folder, filename), text);
    });

    // Create an index.d.ts file for this collection and write its exports
    fs.writeFileSync(resolve(root, "dist/typings", collection.folder, "index.d.ts"), collection.exports.join("\n"));

    mainDefinitionText += `import * as ${exportName} from './typings/${collection.folder}';\nexport {${exportName}};\n`;
});

fs.writeFileSync(resolve(root, "dist/index.d.ts"), mainDefinitionText);