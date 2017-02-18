'use strict';

module.exports = function() {
  $.gulp.task('sprite:svg', function() {
    return $.gulp.src('./source/sprite/*.svg')
      .pipe($.gp.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.gp.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gp.svgSprite({
          mode: {
          symbol: {
              sprite: "../sprite.svg",
              render      : {
                  scss    : {
                      dest:'../../../../source/style/sprite.scss',
                      template: "./source/template/_sprite_template.scss"
                  }
              }
          }
        }
      }))
      .pipe($.gulp.dest($.config.root + '/assets/img'))
  })
    $.gulp.task('sprite:svg-style', function() {
        return $.gulp.src('./source/style/sprite.scss')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style Sprite' }))
            .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest($.config.root + '/assets/css'))
            .pipe($.browserSync.stream());
    })
};
