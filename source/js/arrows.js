var arrow = (function () {
    return {
        init: function(elem,scrollTo){
            $(elem).click(function(){
                if(!isNumeric(scrollTo))
                    scrollTo = $(scrollTo).offset().top;
                var body = $('html, body');
                body.stop().animate({scrollTop:scrollTo}, '300', 'swing');
            });
        }
    }
}());