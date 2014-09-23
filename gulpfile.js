var gulp = require('gulp')
  , rename = require('gulp-rename')

  , gutil = require('gulp-util')
  , browserify = require('browserify')
  , source = require('vinyl-source-stream')

  , uglify = require('gulp-uglify')
  , runSequence = require('run-sequence')
var path = require('path');

var watcher = gulp.watch(['./lib/**/*.js', './lib/*.js'], ['default'])
watcher.on('change', function(event) {
  console.log('File '+event.path+' was '+event.type+', running tasks...')
})

gulp.task('browserify', function() {
  return browserify({ entries: './index.js' })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('nexusUI.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('uglify', function() {
  return gulp.src('./dist/nexusUI.js')
    .pipe(uglify())
    .pipe(rename('nexusUI.min.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('default', function(done) {
  runSequence('browserify', 'uglify', done)
})