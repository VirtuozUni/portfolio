var slider = (function(){
    var sliderTime;
    return {
        changePreview: function(elem,image){
            $(elem).fadeOut(500,function() {$(this).attr('src',image).fadeIn(500)});
        },
        slider: function(list,inx){
            clearTimeout(sliderTime);
            inx = (inx>=list.length)?0:inx;
            $('.c-slider-buttons__left').data('prev',((inx-1) < 0)?(list.length-1):(inx-1));
            slider.changePreview('.l-left__preview','/assets/img/slider/'+list[$('.c-slider-buttons__left').data('prev')]);
            $('.c-slider-buttons__right').data('next',((inx+1) >= list.length)?0:(inx+1));
            slider.changePreview('.l-right__preview','/assets/img/slider/'+list[$('.c-slider-buttons__right').data('next')]);
            $('.c-slider-main-image').fadeOut(
                500,
                function() {
                    $(this).attr('src','/assets/img/slider/'+list[inx])
                        .fadeIn(500, function(){
                            inx++;
                            sliderTime = setTimeout(function(){slider.slider(list,inx)},7000);
                        });

                }
            );
        },
        init: function() {
            var sliderList = ['work-1.png','work-2.png','work-3.png','work-4.png'];
            $('.c-slider-buttons__left').data('prev',sliderList.length-1)
                .click(function() {slider.slider(sliderList,$(this).data('prev'));});
            console.log('/assets/img/slider/'+sliderList[$('.c-slider-buttons__left').data('prev')]);
            $('.l-left__preview').attr('src','/assets/img/slider/'+sliderList[$('.c-slider-buttons__left').data('prev')]);
            $('.c-slider-buttons__right').data('next',1)
                .click(function() {slider.slider(sliderList,$(this).data('next'));});
            $('.l-right__preview').attr('src','/assets/img/slider/'+sliderList[$('.c-slider-buttons__right').data('next')]);

            sliderTime = setTimeout(function(){slider.slider(sliderList,1)},7000);
        }
    }
}());

