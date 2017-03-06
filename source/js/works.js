var works = (function(){
    return {
        clear: function() {
            $('.l-callback__name,.l-callback__mail,.l-callback__message').val('').removeClass('error').removeClass('valide');
        },
        formValidate:function(){
            $('.l-callback__name,.l-callback__mail,.l-callback__message').focusin(function(){
                var id = $(this).attr('id');
                console.log('#'+id+'__popup');
                removePopup($('#'+id+'__popup'));
            });
            $('.l-callback__name,.l-callback__mail,.l-callback__message').focusout(function(){
                var id =$(this).attr('id');
                if($(this).val().length > 0)
                {
                   if($(this).attr('type') == 'email') {
                       if($(this).val().search('@') > 0 && $(this).val().search('@') < $(this).val().length)
                           $(this).removeClass('error').addClass('valide');
                       else
                       {
                           $(this).removeClass('valide').addClass('error');
                           getPopupError('Вы не правильно ввели mail',$(this),$('.l-callback__callback-place'));
                       }
                   }
                   else
                       $(this).removeClass('error').addClass('valide');
                }
                else
                {
                    var label = $(this).attr('placeholder').toLowerCase();
                    label = label.replace('ваше','');
                    $(this).removeClass('valide').addClass('error');
                    getPopupError('Вы не ввели '+label,$(this),$('.l-callback__callback-place'));
                }
            });
        },
        send: function(){
            if($('.l-callback__name').val().length == 0 || $('.l-callback__mail').val().length == 0 ||  $('.l-callback__message').val().length == 0) {
                if ($('.l-callback__name').val().length == 0) {
                    removePopup($('#l-callback__name__popup'));
                    $('.l-callback__name').removeClass('valide').addClass('error');
                    getPopupError('Вы не ввели имя',$('.l-callback__name'),$('.l-callback__callback-place'));
                }
                if ($('.l-callback__mail').val().length == 0) {
                    removePopup($('#l-callback__mail__popup'));
                    $('.l-callback__mail').removeClass('valide').addClass('error');
                    getPopupError('Вы не ввели email',$('.l-callback__mail'),$('.l-callback__callback-place'));
                }
                if ($('.l-callback__message').val().length == 0) {
                    removePopup($('#l-callback__message__popup'));
                    $('.l-callback__message').removeClass('valide').addClass('error');
                    getPopupError('Вы не ввели сообщение',$('.l-callback__message'),$('.l-callback__callback-place'));
                }
            }
            else {

            }
        },
        init: function(){
            this.formValidate();
            blur.init();
            slider.init();
            arrow.init(".l-header__arrow",".c-full-block");
        }
    }
}());