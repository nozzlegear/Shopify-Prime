"use strict";

const ts          = require("gulp-typescript");
const seq         = require("run-sequence");
const path        = require("path");
const gulp        = require("gulp");
const mocha       = require("gulp-mocha");
const mergetasks  = require("merge2");

const tsConfig = path.resolve(__dirname, "tsconfig.json");
const libProject = ts.createProject(tsConfig, {declaration: true});
const testsProject = ts.createProject(tsConfig, {declaration: false});
const tsFiles = ["index.ts", "modules/**/*.ts", "enums/**/*.ts", "infrastructure/**/*.ts", "options/**/*.ts"];

gulp.task("build", function ()
{
    const build = gulp.src(tsFiles)
        .pipe(ts(libProject))
        .js
        .pipe(gulp.dest("./dist"));
    
    return build;
})

gulp.task("test", ["build"], () => 
{
    const buildTests = gulp.src("tests/*.ts")
        .pipe(ts(testsProject))
        .js
        .pipe(gulp.dest("dist"))
        .pipe(mocha());

    return buildTests;
});