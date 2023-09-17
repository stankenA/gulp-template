const gulp = require('gulp');

const fileInclude = require('gulp-file-include');

const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const sourceMaps = require('gulp-sourcemaps');

const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const changed = require('gulp-changed');
const fs = require('fs');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const webpack = require('webpack-stream');
const babel = require('gulp-babel');

const imagemin = require('gulp-imagemin');


// В данном таске нужно проверить, существует ли вообще папка build для исключения возникновения ошибок
// done нужен, чтобы дать галпу понять, что таск завершен
gulp.task('clean:dev', function (done) {
  if (fs.existsSync('./build/')) {
    return gulp
      .src('./build/', { read: false })
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
gulp.task('html:dev', function () {
  return gulp
    .src(['./src/*.html', '!./src/blocks/*.html']) // ! - значит включать не нужно
    .pipe(changed('./docs/', { hasChanged: changed.compareContents }))
    .pipe(plumber(configureNotify('HTML')))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build/'))
});

// Компиляция sass
gulp.task('sass:dev', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(changed('./build/css/'))
    .pipe(plumber(configureNotify('SCSS')))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./build/css'))
});

// Копирование изображений в билд
gulp.task('images:dev', function () {
  return gulp
    .src('./src/assets/img/**/*')
    .pipe(changed('./build/assets/img/'))
    .pipe(plumber(configureNotify('images')))
    .pipe(imagemin())
    .pipe(gulp.dest('./build/assets/img/'))
});

// Копирование шрифтов в билд
gulp.task('fonts:dev', function () {
  return gulp
    .src('./src/vendor/fonts/**/*')
    .pipe(changed('./build/fonts/'))
    .pipe(gulp.dest('./build/fonts/'))
});

gulp.task('js:dev', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./build/js/'))
    .pipe(plumber(configureNotify('JS')))
    // .pipe(babel())
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(gulp.dest('./build/js/'))
})

// Запуск сервера
gulp.task('server:dev', function () {
  return gulp
    .src('./build/')
    .pipe(server({
      livereload: true,
      open: true
    }))
});

// Наблюдение за изменением файлов
gulp.task('watch:dev', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
  gulp.watch('./src/**/*.html', gulp.parallel('html:dev'));
  gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
  gulp.watch('./src/vendor/fonts/**/*', gulp.parallel('fonts:dev'));
  gulp.watch('./src/js/*.js', gulp.parallel('js:dev'));
});
