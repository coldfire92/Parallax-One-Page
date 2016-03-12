'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

var postcss = require('gulp-postcss');
var postCssNested = require('postcss-nested');
var processors = [postCssNested];

/* Js
   ========================================================================== */

var mainFile = ['./src/js/main.js'];
var dependencies = [];

function js(watch) {
  var bundler = watchify(browserify(mainFile, { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
       .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(addsrc(dependencies))
      .pipe(concat('parallaxOnePage.js'))
      .pipe(uglify({
        mangle : false,
      }))
      .on('error', gutil.log)
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

/* Server
   ========================================================================== */

gulp.task('serve', [], function() {
    js(true);
    css();

    browserSync.init({
        server: {
            baseDir: ['.']
        }
    });

    gulp.watch('./src/css/*.css',css);
});

/* Css
   ========================================================================== */

function css(){
    gulp.src('./src/css/*.css')
      .pipe(postcss(processors))
      .on('error', gutil.log)
      .pipe(gulp.dest('./demo/css'));
}

gulp.task('default', ['serve']);
