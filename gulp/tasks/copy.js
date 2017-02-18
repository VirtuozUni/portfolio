/**
 * Created by User on 11.02.2017.
 */
'use strict';

module.exports = function() {

    $.gulp.task('copy:fonts', function() {
        return $.gulp.src('./source/fonts/**/*.*', { since: $.gulp.lastRun('copy:fonts') })
            .pipe($.gulp.dest($.config.root + '/assets/fonts'));
    });
    $.gulp.task('copy:image', function() {
        return $.gulp.src('./source/images/**/*.*', { since: $.gulp.lastRun('copy:image') })
            .pipe($.gulp.dest($.config.root + '/assets/img'));
    });
    $.gulp.task('copy',
        $.gulp.parallel(
            'copy:fonts',
            'copy:image'
        ));
};
