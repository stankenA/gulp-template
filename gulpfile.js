const gulp = require('gulp');

require('./gulp/dev.js');
require('./gulp/docs.js');

// Запуск проекта в режим разработки
gulp.task('default', gulp.series(
  'clean:dev',
  gulp.parallel('html:dev', 'sass:dev', 'js:dev', 'images:dev', 'fonts:dev'),
  gulp.parallel('server:dev', 'watch:dev')
));

gulp.task('docs', gulp.series(
  'clean:docs',
  gulp.parallel('html:docs', 'sass:docs', 'js:docs', 'images:docs', 'fonts:docs'),
  gulp.parallel('server:docs')
));
