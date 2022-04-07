'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');

function buildStyles() {
	return gulp
		.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			useDir: './',
		},
	});
	gulp.watch('./sass/**/*.scss', buildStyles);
	gulp.watch(['./*.html', './js/**/*.js']).on('change', browserSync.reload);
}

exports.watch = gulp.series(buildStyles, watch);
exports.build = buildStyles;
