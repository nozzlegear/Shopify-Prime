"use strict";

const ts          = require("gulp-typescript");
const seq         = require("run-sequence");
const path        = require("path");
const gulp        = require("gulp");
const replace     = require("gulp-string-replace");
const mergetasks  = require("merge2");

const tsFiles = ["index.ts", "modules/**/*.ts"];
const tsConfig = path.resolve(__dirname, "tsconfig.json");
const libProject = ts.createProject(tsConfig, {declaration: true});
const testsProject = ts.createProject(tsConfig, {declaration: false});

gulp.task("build", function ()
{
    const build = gulp.src(tsFiles)
        .pipe(ts(libProject));
    
    const buildDefinition = build
        .dts
        .pipe(gulp.dest("./dist"));
        
    const buildLib = build
        .js
        .pipe(gulp.dest("./dist"));
    
    return mergetasks(buildDefinition, buildLib);
})

gulp.task("build:tests", () => 
{
    // Tests are using relative requires for Shopify Prime module resolution, so they need to output
    // to a top-level folder (built-tests) rather than e.g. tests/built.
    
    const buildTests = gulp.src("tests/*.ts")
        .pipe(ts(testsProject))
        .js
        .pipe(gulp.dest("built_tests"));

    return buildTests;
});

gulp.task("default", (cb) =>
{
    seq("build", "build:tests", cb);   
});