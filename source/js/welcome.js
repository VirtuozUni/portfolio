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
        message: function(text){
            alert(text);
        },
        login: function() {
          $('.c-side-content.back .l-welcome-buttons__button:last-child .c-button__link')[0].click(function(){
                if($('#robot:checked').length == 0) blog.message('Вы робот!');
                else if($('#robot-yes:checked').length == 0) blog.message('Вы робот!');
                else {

                }
          });
        },
        init: function() {
            this.flipper();
            this.parallax();
            this.preloader();
        }
    }
}());