var blur = (function() {
    var wrapper = document.querySelector('.l-callback__callback-place'),
        form = document.querySelector('.blur'),
        bgImgW = 2000,
        bgImgH = 1699;
    return {
        set: function() {
            var imgWidth = document.querySelector('.l-callback').offsetWidth,
                posLeft  = -wrapper.offsetLeft,
                posTop = -wrapper.offsetTop,
                blurCSS = form.style;
            blurCSS.backgroundSize = imgWidth + 'px' + ' auto';
            blurCSS.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
        },
        init: function() {
            window.onresize = function(){blur.set();}
            this.set();
        }
    }
}());