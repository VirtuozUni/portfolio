'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  spritesmith: require('gulp.spritesmith'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
    'sprite:svg',
    'sprite'
    ),
  $.gulp.parallel(
    'sass',
    'sprite:svg-style',
    'pug',
    'js:foundation',
    'js:process',
    'copy',
    'css:foundation'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
