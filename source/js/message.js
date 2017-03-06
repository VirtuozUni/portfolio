var message = (function(){
    return {
        init: function(text) {
            $('body').append('<div class="c-modal"><div class="c-modal__window"><div class="window__text"></div><a class="c-button">Закрыть</a></div></div>');
            $('.c-modal__window .window__text').text(text);
            $('.c-modal__window .c-button').click(function(){
                message.del();
            });
            $('.c-modal').css('display','flex').animate({opacity: 1},300,'swing',function(){
                $('.c-modal__window').addClass('showed');
            });
        },
        del: function(){
            $('.c-modal__window').removeClass('showed');
            $('.c-modal').animate({opacity: 0},300,'swing',function(){
                $(this).remove();
            });
        }
    }
}());