var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var mocha = require('gulp-mocha');
var execSync = require('child_process').execSync;
var coveralls = require('gulp-coveralls');
var runSequence = require('run-sequence');

gulp.task('clean:coveralls', function () {
    return del([
        'test/coverage',
        'test/results',
        'lib-cov'
    ]);
});

gulp.task('jscoverage', function () {
    return execSync('./node_modules/.bin/jscoverage --no-highlight lib lib-cov');
});

gulp.task('coveralls:dirs', function() {
    fs.renameSync('lib', 'lib-orig');
    fs.renameSync('lib-cov', 'lib');
    fs.mkdirSync('test/coverage');
    fs.mkdirSync('test/results');
    
    return;
});

gulp.task('coveralls:make', function() {
    execSync('./node_modules/.bin/mocha test -R html-cov > test/results/coverage.html');
    execSync('./node_modules/.bin/mocha test -R mocha-lcov-reporter > test/coverage/coverage-dist.lcov');
    
    return;
});

gulp.task('coveralls:clean', function() {
    execSync('rm -rf lib');
    execSync('mv lib-orig lib');
    
    return;
});

gulp.task('coveralls', function (cb) { 
    runSequence(
        'build:app',
        'clean:coveralls',
        'jscoverage',
        'coveralls:dirs',
        'coveralls:make',
        'coveralls:clean',
    function(error) {
        if (error) {
            console.log(error);
        }
        
        cb(error);
    });
});

gulp.task('publish:coveralls', ['coveralls'], function() {
    return gulp.src('test/coverage/coverage-dist.lcov')
        .pipe(coveralls());
});

gulp.task('test:app', ['build:app'], function () { 
    return gulp.src('test/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});

// gulp.task('test:browser', function () { 
//     return gulp.src('tests/index.html', {read: false})
//         .pipe(mochaPhantomJS({reporter: 'nyan'}));
// });

// gulp.task('test-client', ['bundle-test'], function() {
//     return gulp.src('tests/fixtures/index.html')
//         .pipe(mochaPhantomJS({reporter: 'nyan'}));
// });