var menu = (function(){
    return {
        menuItemShow: function(item,inx,len) {
            var def = $.Deferred();
            console.log(item+':nth-child('+inx+')')
            $(item+':nth-child('+inx+') .c-menu__link').css({transform: 'scale(1,1)', opacity: 1});
            inx++;

            setTimeout(function(){
                if(inx <= len)
                    menu.menuItemShow(item,inx,len).done(function(){def.resolve();});
                else
                    def.resolve();
            },100);

            return def.promise();
        },
        menuItemHide: function(item,inx,len) {
            var def = $.Deferred();
            console.log(item+':nth-child('+inx+')')
            $(item+':nth-child('+inx+') .c-menu__link').css({transform: 'scale(0,0)', opacity: 0});
            inx++;

            setTimeout(function(){
                if(inx <= len)
                    menu.menuItemHide(item,inx,len).done(function(){def.resolve();console.log(inx,len)});
                else
                    def.resolve();
            },100);

            return def.promise();
        },
        show: function(){
            $('.c-menu').show().addClass('showed');
            $('.c-header__menu').addClass('showed');
            $('.c-menu__bg:first-child').animate({width: '50%', opacity: 1}, 500);
            $('.c-menu__bg.bg_right').animate({width: '50%', left: '50%', opacity: 1}, 500, function(){
                menu.menuItemShow('.c-menu__item',1,$('.c-menu__link').length).done(function(){});
            });
        },
        hide: function(){
            menu.menuItemHide('.c-menu__item',1,$('.c-menu__link').length).done(function(){
                $('.c-header__menu').removeClass('showed');
                $('.c-menu__bg').animate({opacity: 0},500, function(){
                    $('.c-menu').removeClass('showed').hide();
                    $('.c-menu__bg:first-child').css({
                        width: '0%'
                    });
                    $('.c-menu__bg.bg_right').css({
                        width: '0%',
                        left: '100%'
                    });
                });
            });
        },
        init: function(){
            if($('.c-menu').hasClass('showed'))
                menu.hide();
            else
                menu.show();
        }
    }
}());