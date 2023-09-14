const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');

// В данном таске нужно проверить, существует ли вообще папка build для исключения возникновения ошибок
// done нужен, чтобы дать галпу понять, что таск завершен
gulp.task('clean', function (done) {
  if (fs.existsSync('./build/')) {
    return gulp
      .src('./build/', { read: false })
      .pipe(clean({ force: true }))
  }

  done();
});

// Включение html файлов друг в друга
gulp.task('html', function () {
  return gulp
    .src('./src/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build/'))
});

// Компиляций sass
gulp.task('sass', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./build/css'))
});

// Копирование изображений в билд
gulp.task('images', function () {
  return gulp
    .src('./src/images/**/*')
    .pipe(gulp.dest('./build/img'))
});

// Запуск сервера
gulp.task('server', function () {
  return gulp
    .src('./build/')
    .pipe(server({
      livereload: true,
      open: true
    }))
});

// Наблюдение за изменением файлов
gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('./src/**/*.html', gulp.parallel('html'));
  gulp.watch('./src/img/**/*', gulp.parallel('images'));
});

// Запуск проекта
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('html', 'sass', 'images'),
  gulp.parallel('server', 'watch')
));
