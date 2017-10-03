const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssZindex = require('postcss-zindex');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const inlinesource = require('gulp-inline-source');
const wait = require('gulp-wait');

gulp.task('process-css', function() {
  var plugins = [
    autoprefixer({
      browsers: ['last 3 version']
    }),
    postcssZindex({startIndex : 1})
  ]
  return gulp.src('./styles/*.css')
    .pipe(postcss(plugins))
    .pipe(cleanCSS({
      level: {
        1: {},
        2: {}
      }
    }))
    .pipe(concat('prod.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('inlinesource', function() {
  return gulp.src('*.html')
      .pipe(wait(100))
      .pipe(inlinesource())
      .pipe(gulp.dest('./dist'));
})

gulp.task('default', ['process-css', 'inlinesource']);
