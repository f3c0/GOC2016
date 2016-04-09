var gulp = require('gulp');
//var tsc = require('gulp-tsc');
var tsc  = require('gulp-typescript-compiler');

gulp.task('default', function () {
	return gulp
		.src('app/**/*.ts')
		.pipe(tsc({
			module: 'amd',
			target: 'ES5',
			sourcemap: true,
			logErrors: true
		}))
		.pipe(gulp.dest('dist'));
});