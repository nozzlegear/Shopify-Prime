import * as fs from 'fs';
import * as path from 'path';

type Package = { scripts: { [name: string]: string } };

const pkg: Package = require("../package.json");
const testFiles = fs.readdirSync(path.join(__dirname, "../tests"));

testFiles.forEach(fileName => {
    const fileInfo = path.parse(fileName); 

    if (fileInfo.name === "_utils") {
        return;
    }

    const scriptName = `test:${fileInfo.name}`;
    const rawScriptName = `${scriptName}:raw`;
    const rawScriptValue = `alsatian -T ./dist/tests/${fileInfo.name}.js`;
    const scriptValue = `${rawScriptValue} | tap-bark`;

    pkg.scripts[scriptName] = scriptValue;
    pkg.scripts[rawScriptName] = rawScriptValue;
})

fs.writeFileSync(path.join(__dirname, "../package.json"), JSON.stringify(pkg, null, 4));