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
        "lib"
    ]);
});

gulp.task("coveralls:prepare", function () {
    fs.mkdirSync("lib");
    fs.mkdirSync("test/coverage");
    fs.mkdirSync("test/results");
    execSync("cp src/JSW-Logger.js lib/JSW-Logger.js");
    execSync("cp src/Options.js lib/Options.js");
    
    return;
});

gulp.task("jscoverage", function () {
    execSync("./node_modules/jscoverage/bin/jscoverage --no-highlight lib test/coverage/lib");
    
    return;
});

gulp.task("coveralls:make", function() {
    process.env.test_coverage = true;
    
    execSync("mocha test/specs/1_Base.js -R html-cov > test/results/coverage.html");
    execSync("mocha test/specs/1_Base.js -R mocha-lcov-reporter > test/coverage/coverage-dist.lcov");
    
    delete process.env.test_coverage;
    
    return;
});

gulp.task("coveralls", function (cb) { 
    runSequence(
        "build:app",
        "clean:coveralls",
        "coveralls:prepare",
        "jscoverage",
        "coveralls:make",
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