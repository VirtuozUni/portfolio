function parallax(){
    var pContainer = document.getElementById('parallax'),
        layers = pContainer.children;

    window.addEventListener('mousemove', function (e){
        var pageX = e.pageX,
            pageY = e.pageY,
            initialX = (window.innerWidth / 2) - pageX,
            initialY = (window.innerHeight / 2) - pageY;
       // console.log(pageX, pageY);
        [].slice.call(layers).forEach(function(layer, i) {
            var
                divider = i /100,
                bottomPos = (window.innerHeight / 2) *divider,
                rightPos = (window.innerWidth / 2) *divider,
                posX = initialX *divider,
                posY = initialY *divider,
                layerSryle = layer.style;
            //console.log(posX, posY, $(this),i);
            layerSryle.transform = 'translate3d('+posX+'px,'+posY+'px, 0)';
            layerSryle.bottom = '-'+bottomPos+'px';
            layerSryle.left = '-'+rightPos+'px';
        });
    });


}