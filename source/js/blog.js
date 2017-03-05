var blog = (function(){
    return {
        load: function() {
            $.ajax({
                url: 'assets/includes/articles.json',
                cache: false,
                dataType: 'json',
                type: 'GET'
            }).done(function (data) {
                data = data.articles;
                console.log(data);
                data.forEach(function(item){
                    var article = $('<div>').addClass('c-blog-article').data('index',item.id),
                        title = $('<div>').addClass('c-blog-article__subtitle').text(item.title),
                        date = $('<div>').addClass('c-blog-article__date'),
                        nav = $('<li>').addClass('l-blog-lnav__item').text(item.title).data('index',item.id),
                        text = $('<div>').addClass('c-blog-article__text');
                    var dArray = item.date.split('.');
                    var d = new Date(dArray[2]*1,dArray[1]*1-1,dArray[0]*1);
                    date.text(d.getDate()+' '+getMonth(d.getMonth())+' '+d.getFullYear());
                    text.html(item.text.replace('\\n','\n'));
                    text.children('pre').addClass('prettyprint linenums lang-js');
                    nav.click(function(){
                        if(!$(this).hasClass('item_active'))
                        {
                            $('.item_active').removeClass('item_active');
                            $(this).addClass('item_active');
                            console.log($(this).data('index'));
                            blog.jump($(this).data('index'));
                        }
                    })
                    $('.l-blog-lnav__list').append(nav);
                    article.append(title).append(date).append(text);
                    $('.c-blog-articles').append(article);
                });
                prettyPrint();
                blog.scroll();
                blog.active($('.l-blog-lnav__item:first-child').data('index'));
            });
        },
        active: function(id) {
            var curId = $('.item_active').data('index');
            if (curId == undefined || id != curId) {
                $('.item_active').removeClass('item_active');
                $('.l-blog-lnav__item').filter(function () {
                    return $(this).data('index') == id;
                }).addClass('item_active');
            }
        },
        jump: function(id) {
            var body = $('html, body');
            var article = $('.c-blog-article').filter(function() {
                return $(this).data('index') == id;
            });

            if(article.length > 0) {
                var scrollTo = article.offset().top;
                body.stop().animate({scrollTop: scrollTo}, '300', 'swing');
            }

        },
        findArticleByPos: function(articlesPos,curPos) {
            var res = articlesPos[0].inx;
            for(var i in articlesPos) {
                var item = articlesPos[i];
                if(curPos >= item.top && (articlesPos[i*1+1]== undefined || curPos < articlesPos[i*1+1].top))
                {
                    res = item.inx;
                    break;
                }
            }

            return res;
        },
        scroll: function() {
            var articlesPos = new Array();
            $('.c-blog-article').each(function(inx) {

                articlesPos[inx] = {
                    top: $(this).offset().top-$(this).css('margin-top').replace('px','')*1,
                    inx: $(this).data('index')
                };
            });

          $(window).scroll(function(e){

            var navEl = $('.l-blog-lnav__list'),
                nav = $('.l-content').offset().top,
                navPos = this.pageYOffset - nav;
            blog.active(blog.findArticleByPos(articlesPos,this.pageYOffset+($(this).height()/2)));
            if(navPos > 0 && (!isMobile || window.innerWidth > 768))
            {
                navEl.css('position','fixed')
                navEl.css('top','0px');
            }
            else
                navEl.css('position','inherit');

          });
        },
        mobileMenu: function() {
            console.log('mobileMenu');
            $('.l-blog-lnav').click(function(){
                console.log('mobileMenu click');
                if(!$('.l-blog-lnav').hasClass('showed'))
                    $('.l-blog-lnav').animate({left: 0},300,'swing').addClass('showed');
                else
                    $('.l-blog-lnav').animate({left: -310},300,'swing').removeClass('showed');
            });
        },
        init: function() {
            this.load();
            if(isMobile || window.innerWidth <= 768) this.mobileMenu();
        }
    }
}());