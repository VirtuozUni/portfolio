var slider = (function(){
    var sliderTime;
    return {
        changePreview: function(elem,image){
            $(elem).fadeOut(500,function() {$(this).attr('src',image).fadeIn(500)});
        },
        changeTitle: function (elem,text) {
            $(elem).fadeOut(500,function() {$(this).text(text).fadeIn(500)});
        },
        slider: function(list,inx){
            clearTimeout(sliderTime);
            inx = (inx>=list.length)?0:inx;
            $('.c-slider-buttons__left').data('prev',((inx-1) < 0)?(list.length-1):(inx-1));
            slider.changePreview('.l-left__preview','/assets/img/slider/'+list[$('.c-slider-buttons__left').data('prev')].img);
            slider.changeTitle('.c-slider-description .c-subtitle',list[inx].title);
            slider.changeTitle('.c-slider-description .c-accent-title',list[inx].lang);
            $('.c-slider-description .c-button').attr('href',list[inx].link);

            $('.c-slider-buttons__right').data('next',((inx+1) >= list.length)?0:(inx+1));
            slider.changePreview('.l-right__preview','/assets/img/slider/'+list[$('.c-slider-buttons__right').data('next')].img);
            $('.c-slider-main-image').fadeOut(
                500,
                function() {
                    $(this).attr('src','/assets/img/slider/'+list[inx].img)
                        .fadeIn(500, function(){
                            inx++;
                            sliderTime = setTimeout(function(){slider.slider(list,inx)},7000);
                        });

                }
            );
        },
        init: function() {
            $.get('/assets/includes/slider.json').done(function(data){
                var sliderList = data.slides;
                console.log(data);
                slider.changeTitle('.c-slider-description .c-subtitle',sliderList[0].title);
                slider.changeTitle('.c-slider-description .c-accent-title',sliderList[0].lang);
                $('.c-slider-main-image').attr('src','/assets/img/slider/'+sliderList[0].img);
                $('.c-slider-description .c-button').attr('href',sliderList[0].link);
                $('.c-slider-buttons__left').data('prev',sliderList.length-1)
                    .click(function() {slider.slider(sliderList,$(this).data('prev'));});
                $('.l-left__preview').attr('src','/assets/img/slider/'+sliderList[$('.c-slider-buttons__left').data('prev')].img);
                $('.c-slider-buttons__right').data('next',1)
                    .click(function() {slider.slider(sliderList,$(this).data('next'));});
                $('.l-right__preview').attr('src','/assets/img/slider/'+sliderList[$('.c-slider-buttons__right').data('next')].img);

                sliderTime = setTimeout(function(){slider.slider(sliderList,1)},7000);
            });

        }
    }
}());

