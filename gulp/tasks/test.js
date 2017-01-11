var gulp = require("gulp");
var fs = require("fs");
var del = require("del");
var mocha = require("gulp-mocha");
var execSync = require("child_process").execSync;
var coveralls = require("gulp-coveralls");
var runSequence = require("run-sequence");
var mochaPhantomJS = require("gulp-mocha-phantomjs");

gulp.task("clean:coveralls", function () {
    return del([
        "test/coverage",
        "test/results",
        "lib-cov"
    ]);
});

gulp.task("coveralls:prepare", function () {
    fs.mkdirSync("lib");
    execSync("cp src/JSW-Logger.js lib/JSW-Logger.js");
    
    return;
});

gulp.task("jscoverage", function () {
    execSync("./node_modules/jscoverage/bin/jscoverage --no-highlight lib lib-cov");
    
    return;
});

gulp.task("coveralls:dirs", function() {
    fs.renameSync("lib", "lib-orig");
    fs.renameSync("lib-cov", "lib");
    fs.mkdirSync("test/coverage");
    fs.mkdirSync("test/results");
    
    return;
});

gulp.task("coveralls:make", function() {
    execSync("node test/coveralls.js");
    
    return;
});

gulp.task("coveralls:finalize", function() {
    execSync("rm -rf lib lib-orig");
    
    return;
});

gulp.task("coveralls", function (cb) { 
    runSequence(
        "build:app",
        "clean:coveralls",
        "coveralls:prepare",
        "jscoverage",
        "coveralls:dirs",
        "coveralls:make",
        "coveralls:finalize",
    function(error) {
        if (error) {
            console.log(error);
        }
        
        cb(error);
    });
});

gulp.task("publish:coveralls", ["coveralls"], function() {
    return gulp.src("test/coverage/coverage-dist.lcov")
        .pipe(coveralls());
});

gulp.task("test:app", ["build:app"], function () { 
    return gulp.src("test/specs/*.js", {read: false})
        // gulp-mocha needs filepaths so you can"t have any plugins before it
        .pipe(mocha({reporter: "nyan"}));
});

gulp.task("test:browser", ["compress:app"], function () { 
    return gulp.src("test/index.html", {read: false})
        .pipe(mochaPhantomJS({reporter: "nyan"}));
});