// npm install gulp-less browser-sync gulp-concat gulp-rename gulp-uglify gulp --save-dev

var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('uglify', function() {
  return gulp.src([
    'src/*.js',
    ])
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('app/js'))
      .pipe(rename('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
      .pipe(reload({stream: true}));
});

// watch files for changes and reload
gulp.task('serve',['uglify'],function() {
  browserSync({
    server: {
      baseDir: './app/'
    }
  });
	gulp.watch('src/*.js',['uglify']);
	gulp.watch('app/index.html').on('change', reload);
});
gulp.task('default', ['serve']);
