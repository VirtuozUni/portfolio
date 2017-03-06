var welcome = (function(){
    return {
        flipper: function () {
            $('.wrapper_welcome').click(function (e) {

                if($('.l-welcome-box').hasClass('hover') && $(this).data('blocked') == false)
                {
                    var pageX = e.pageX,
                        pageY = e.pageY,
                        wbox = $('.c-side-content.back'),
                        wboxW = wbox.width(),
                        wboxH = wbox.height(),
                        wboxOffset = wbox.offset();
                    if(pageX < wboxOffset.left || pageX > (wboxOffset.left + wboxW) || pageY < wboxOffset.top || pageY > (wboxOffset.top + wboxH))
                    {
                        console.log('removeClass');
                        $('.l-welcome-box').removeClass('hover');
                        $('.l-auth-block__button').show();
                    }
                }
                else
                    $('.wrapper_welcome').data('blocked', false);
            });
            $('.l-auth-block__button').click(function () {
                console.log('addClass');
                $('.l-welcome-box').addClass('hover');
                $('.l-auth-block__button').hide();
                $('.wrapper_welcome').data('blocked', true);
            });
        },
        parallax: function () {
            if (!isMobile || window.innerWidth > 768) {

                var pContainer = document.getElementById('parallax'),
                    layers = pContainer.children;

                window.addEventListener('mousemove', function (e) {
                    var pageX = e.pageX,
                        pageY = e.pageY,
                        initialX = (window.innerWidth / 2) - pageX,
                        initialY = (window.innerHeight / 2) - pageY;
                    // console.log(pageX, pageY);
                    [].slice.call(layers).forEach(function (layer, i) {
                        var
                            divider = i / 100,
                            bottomPos = (window.innerHeight / 2) * divider,
                            rightPos = (window.innerWidth / 2) * divider,
                            posX = initialX * divider,
                            posY = initialY * divider,
                            layerSryle = layer.style;
                        //console.log(posX, posY, $(this),i);
                        layerSryle.transform = 'translate3d(' + posX + 'px,' + posY + 'px, 0)';
                        layerSryle.bottom = '-' + bottomPos + 'px';
                        layerSryle.left = '-' + rightPos + 'px';
                    });
                });
            }
            else

                $('.parallax_layer').remove();
        },
        preloader: function() {
            preloader.init();
        },
        login: function() {
            $('#login, #password').focusin(function(){
                var id = $(this).attr('id');
                removePopup($('#'+id+'__popup'));
            });
            $('#login, #password').focusout(function(){
                var id =$(this).attr('id');
                if($(this).val().length > 0)
                    $('label.input-icon[for='+id+']').removeClass('error').addClass('valide');
                else
                {
                    var label = $(this).attr('placeholder').toLowerCase();
                    $('label.input-icon[for='+id+']').removeClass('valide').addClass('error');
                    getPopupError('Вы не ввели '+label,$('#'+id),$('.l-welcome-box .back'));
                }
            });
            $('.c-side-content.back .l-welcome-buttons__button:last-child .c-button__link').click(function(){
                  if($('#login').val().length == 0 || $('#password').val().length == 0) {
                      if ($('#login').val().length == 0) {
                          removePopup($('#login__popup'));
                          $('label.input-icon[for=login]').removeClass('valide').addClass('error');
                          getPopupError('Вы не ввели логин',$('#login'),$('.l-welcome-box .back'));
                      }
                      if ($('#password').val().length == 0) {
                          $('label.input-icon[for=password]').removeClass('valide').addClass('error');
                          getPopupError('Вы не ввели пароль',$('#password'),$('.l-welcome-box .back'));
                      }
                  }
                  else if($('#robot:checked').length == 0) message.init('Вы робот!');
                  else if($('#robot-yes:checked').length == 0) message.init('Вы робот!');
                  else {

                  }
            });
        },
        init: function() {
            this.flipper();
            this.parallax();
            this.preloader();
            this.login();
        }
    }
}());