const gulp = require('gulp');

const fileInclude = require('gulp-file-include');
const htmlClean = require('gulp-htmlclean');

const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');

const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const changed = require('gulp-changed');
const fs = require('fs');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const webpack = require('webpack-stream');
const babel = require('gulp-babel');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');


// В данном таске нужно проверить, существует ли вообще папка build для исключения возникновения ошибок
// done нужен, чтобы дать галпу понять, что таск завершен
gulp.task('clean:docs', function (done) {
  if (fs.existsSync('./docs/')) {
    return gulp
      .src('./docs/', { read: false })
      .pipe(clean({ force: true }))
  }

  done();
});

const configureNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: `${title}`,
      message: 'Error <%= error.message %>',
      sound: false
    })
  }
}

// Включение html файлов друг в друга
gulp.task('html:docs', function () {
  return gulp
    .src(['./src/*.html', '!./src/blocks/*.html']) // ! - значит включать не нужно
    .pipe(changed('./docs/'))
    .pipe(plumber(configureNotify('HTML')))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlClean())
    .pipe(gulp.dest('./docs/'))
});

// Компиляция sass
gulp.task('sass:docs', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(changed('./docs/css/'))
    .pipe(plumber(configureNotify('SCSS')))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer())
    .pipe(sassGlob())
    .pipe(groupMedia())
    .pipe(sass())
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./docs/css'))
});

// Копирование изображений в билд
gulp.task('images:docs', function () {
  return gulp
    .src('./src/img/**/*')
    .pipe(changed('./docs/img/'))
    .pipe(webp())
    .pipe(gulp.dest('./docs/img/'))

    .pipe(gulp.src('./src/img/**/*'))
    .pipe(changed('./docs/img/'))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./docs/img/'))
});

// Копирование шрифтов в билд
gulp.task('fonts:docs', function () {
  return gulp
    .src('./src/vendor/fonts/**/*')
    .pipe(changed('./docs/fonts/'))
    .pipe(gulp.dest('./docs/fonts/'))
});

gulp.task('js:docs', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./docs/js/'))
    .pipe(plumber(configureNotify('JS')))
    .pipe(babel())
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(gulp.dest('./docs/js/'))
})

// Запуск сервера
gulp.task('server:docs', function () {
  return gulp
    .src('./docs/')
    .pipe(server({
      livereload: true,
      open: true
    }))
});
