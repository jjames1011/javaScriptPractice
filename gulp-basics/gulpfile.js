'use strict';
//example of setting of gulp tasks to run snippets of js to automate
//repetetive tasks for easier development(compile sass, push to development
//server, minify files, ect)

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');


//concat multiple js files into just one file for quicker loading
gulp.task('concatScripts', () => {
  return gulp.src([
    'js/jquery.js',
    'js/sticky/jquery.js',
    'js/main.js'])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

//minify (compress) js for quicker loading
gulp.task('minifyjs', ['concatScripts'], () => {
  //this app.js file will have been produced by the task above
  return gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('compileSass', () => {
  return gulp.src('scss/application.scss')
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'));

});
gulp.task('build', ['minifyjs', 'compileSass']);


//run gulp default with the command $ gulp
//second parameter is an array of other tasks or dependency
gulp.task('default', ['build']);
