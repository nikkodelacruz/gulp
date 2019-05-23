'use strict' // code should be executed in strict mode -> can't use undeclared variable


// series = execute tasks in order
// parallel = for tasks to run max concurrency (executed out of order)

const { src, dest, parallel, watch } = require('gulp');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

// Depracated
// gulp default
// gulp.task('default', function(){
	// return console.log('gulp is running...');
// });

// gulp.task('uglify', function(){
// 	gulp.src('assets/js/*.js')
// 	.pipe(uglify())
// 	.pipe(gulp.dest('dist/js'))
// });

// nested directories (js inside folders)
// 'script/**/*.js'

/* JS */
// Minify script
// Concatinate(combine) all script files into one file
function js(){
	return src('assets/js/*.js')
	.pipe(concat('script.min.js'))
	.pipe(uglify())
	.pipe(dest('dist'))
}

/* STYLE */
// Convert CSS to LESS
// Minify CSS
function css_less(){
	return src('assets/less/*.less')
	.pipe(less())
	.pipe(cleanCSS())
	.pipe(rename( {basename:'style',suffix:'.min'} ))
	.pipe(dest('dist'))
}

// SASS
function css_sass(){
	return src('assets/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(cleanCSS())
	.pipe(dest('dist'))
}

// run these tasks on gulp command
// exports.js = js;
exports.css_sass = css_sass;
// exports.default = parallel( js, css );

// on gulp commans
exports.default = function(){
	watch('assets/js/*.js',js);
	watch('assets/css/less/**/*.less',css_less);
	
	// Or a composed task
	// watch('src/*.js', series(clean, javascript));
}
