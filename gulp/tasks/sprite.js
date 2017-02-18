'use strict';

module.exports = function() {
    $.gulp.task('sprite', function() {
        return $.gulp.src('./source/images/icons/*.png')
            .pipe($.spritesmith({
            imgName: 'sprite.png',
            cssName: '../../../../source/style/sprite.css'
        }))
            .pipe($.gulp.dest($.config.root + '/assets/img/'))
    });
};
