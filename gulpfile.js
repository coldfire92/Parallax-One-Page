'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

var postcss = require('gulp-postcss');
var postCssNested = require('postcss-nested');
var processors = [postCssNested];

/* Js
   ========================================================================== */

function js(watch) {
  var bundler = watchify(browserify('./src/js/main.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('parallaxOnePage.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

/* Css
   ========================================================================== */

function css(){
    gulp.src('./src/css/*.css')
      .pipe(postcss(processors))
      .pipe(gulp.dest('./demo/css'));
}

/* Watch
   ========================================================================== */

function watch() {
    js(true);
    css();
}

gulp.task('build', function() {  
    js(); 
    css();
});

gulp.task('watch', function() { return watch(); });
gulp.task('default', ['watch']);
