var works = (function(){
    return {
        formValidate:function(){
            $('.l-callback__name,.l-callback__mail,.l-callback__message').focusin(function(){
                var id = $(this).attr('id');
                removePopup($('#'+id+'__popup'));
            });
            $('.l-callback__name,.l-callback__mail,.l-callback__message').focusout(function(){
                var id =$(this).attr('id');
                if($(this).val().length > 0)
                    $(this).removeClass('error').addClass('valide');
                else
                {
                    var label = $(this).attr('placeholder').toLowerCase();
                    label = label.replace('ваше','');
                    $(this).removeClass('valide').addClass('error');
                    getPopupError('Вы не ввели '+label,$('#'+id),$('.l-welcome-box .back'));
                }
            });
            $('.l-callback__callback-place .c-bottom-buttons__button:last-child .c-button__link').click(function(){
                if($('.l-callback__name').val().length == 0 || $('.l-callback__mail').val().length == 0 ||  $('.l-callback__message').val().length == 0) {
                    if ($('.l-callback__name').val().length == 0) {
                        removePopup($('#l-callback__name__popup'));
                        $('.l-callback__name').removeClass('valide').addClass('error');
                        getPopupError('Вы не ввели имя',$('.l-callback__name'),$('.l-callback__callback-place'));
                    }
                    if ($('.l-callback__mail').val().length == 0) {
                        removePopup($('#l-callback__mail__popup'));
                        $('.l-callback__mail').removeClass('valide').addClass('error');
                        getPopupError('Вы не ввели email',$('#password'),$('.l-callback__callback-place'));
                    }
                    if ($('.l-callback__message').val().length == 0) {
                        removePopup($('#l-callback__message__popup'));
                        $('.l-callback__message').removeClass('valide').addClass('error');
                        getPopupError('Вы не ввели сообщение',$('.l-callback__message'),$('.l-callback__callback-place'));
                    }
                }
                else {

                }
            });
        },
        init: function(){
            this.formValidate();
            blur.init();
            slider.init();
            arrow.init(".l-header__arrow",".c-full-block");
        }
    }
}());