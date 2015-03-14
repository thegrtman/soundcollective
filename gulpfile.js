/*jslint node: true*/
'use strict';

var gulp        = require('gulp');
var browserify  = require('gulp-browserify');
var rename      = require('gulp-rename');
var del         = require('del');

var paths = {
    outputDir: './public',
    outputFile: 'soundWorks.js',
	htmlSrc: './src/**/*.html',
    main: './src/SoundWorks/index.js',
    src: './src/SoundWorks'
};

gulp.task('clean', function (cb) {
    del([paths.outputDir + '/' + paths.outputFile], cb);
});

gulp.task('copy', function () {
    return gulp.src(paths.htmlSrc)
	    .pipe(gulp.dest(paths.outputDir));
});

gulp.task('browserify', function () {
    var stream = gulp.src(paths.main)
        .pipe(browserify({
            insertGlobals: false,
            debug: true
        }))
        .pipe(rename(paths.outputFile))
        .pipe(gulp.dest(paths.outputDir));
    return stream;
});

gulp.task('watch', function () {
    gulp.watch(paths.src + '/**/*.*', ['browserify']);
	gulp.watch(paths.htmlSrc, ['copy']);
});

gulp.task('dev', ['watch', 'browserify', 'copy']);

gulp.task('default', ['browserify', 'copy']);