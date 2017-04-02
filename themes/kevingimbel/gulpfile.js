/*
 * Loading the modules we neeed.
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var rollup = require('gulp-rollup');

var path = {
  src: {
    sass: './src/sass',
    js: './src/js'
  },
  dest: {
    css: './static/css',
    js: './static/js'
  }
}

function uglify_single_file (file) {
  var name = file.split('/')
  name = name[name.length - 1]
  name = name.replace('.js', '')

  gulp.src(file)
    .pipe(uglify())
    .pipe(rename(name + '.min.js'))
    .pipe(gulp.dest(path.dest.js))
}

/* super-easy sass task using gulp-sass and compiling with node-sass and Libsass. Lightning fast, also! */
gulp.task('sass', function () {
  gulp.src(path.src.sass + '/style.scss')
    .pipe(prefix({
      browser: ['last 2 versions', '>1%'],
      cascade: false
    }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(path.dest.css))
});

gulp.task('js', function () {
  gulp.src(path.src.js + '/**/*.js')
  // transform the files here.
  .pipe(rollup({
    // any option supported by Rollup can be set here.
    entry: path.src.js + '/main.js'
  }))
  .pipe(gulp.dest(path.dest.js));
});

gulp.task('watch', function () {
  gulp.watch(path.src.sass + '/**/*.scss', ['sass'])
  gulp.watch(path.src.js + '**/*.js', ['js']);
});

gulp.task('default', ['watch', 'sass', 'js'])
