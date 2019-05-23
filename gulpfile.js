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
const babel = require('gulp-babel');

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

/*====*/
/* JS */
/*====*/
function js(){
	return src('assets/js/*.js')
	.pipe(babel({
		presets: ['@babel/env']
	})) // babel -> convert code into backwards compatible version of js in current and old browsers
	.pipe(concat('script.min.js')) //combine all js files
	.pipe(uglify()) //minify js
	.pipe(dest('dist'))
}



/*=======*/
/* STYLE */
/*=======*/
function css_less(){
	return src('assets/less/*.less')
	.pipe(less()) // compile to LESS
	.pipe(cleanCSS()) // minify css
	.pipe(rename({
		basename: 'style',
		suffix: '.min'
	}))
	.pipe(dest('dist'))
}

// SASS
function css_sass(){
	return src('assets/scss/*.scss')
	.pipe(sass().on('error', sass.logError)) // compile to SASS
	.pipe(cleanCSS())
	.pipe(dest('dist'))
}

// run these tasks on gulp command
exports.js = js;
exports.css_sass = css_sass;
// exports.default = parallel( js, css );

// on gulp commans
exports.default = function(){
	watch('assets/js/*.js',js);
	// watch('assets/css/less/**/*.less',css_less);
	watch('assets/scss/**/*.scss',css_sass);
	
	// Or a composed task
	// watch('src/*.js', series(clean, javascript));
}
