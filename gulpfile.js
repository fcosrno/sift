// npm install gulp-less gulp-minify-css gulp-autoprefixer browser-sync gulp-concat gulp-rename gulp-uglify gulp --save-dev

var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    autoprefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('less', function() {
  gulp.src('less/styles.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(autoprefix('last 10 version'))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream: true}));
});

gulp.task('uglify', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/angular/angular.js',
    'bower_components/fuse.js/src/fuse.js',
    'app/db/people.json',
    'bower_components/lodash/lodash.js',
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
// gulp.task('serve', ['less','uglify'],function() {
gulp.task('serve',function() {
  browserSync({
    server: {
      baseDir: './'
      // baseDir: './app/'
    }
  });
	// gulp.watch('less/*.less', ['less']);
	// gulp.watch('src/*.js',['uglify']);
	gulp.watch('index.html').on('change', reload);
});
gulp.task('default', ['serve']);
