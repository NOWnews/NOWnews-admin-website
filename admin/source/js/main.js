$(function() {
    var $window = $(window);

    // 記錄位置 (列表頁)
    var nearByNewsBtn = $('.near-by-news').length > 0;
    if (nearByNewsBtn) {
        $('.near-by-news a').on('click', function (event) {
            event.preventDefault();
            $('#loading span').text('正在搜尋你附近的人');
            $('#loading').removeClass('mui--hide');
            var href = $(this).attr('href');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    var longitude = position.coords.longitude;
                    var latitude = position.coords.latitude;
                    location.href = href + '?longitude='+ longitude +'&latitude='+ latitude;
                },function(error){
                    alert('你的瀏覽器不支援，暫時無法使用此功能!');
                    $('#loading').addClass('mui--hide');
                });
            } else {
                alert('你的瀏覽器不支援，暫時無法使用此功能!');
                $('#loading').addClass('mui--hide');
            }
        });
    }

    // 蓋版廣告
    var adsCoverDom = $('.ads-cover').length > 0;
    if (adsCoverDom) {
        // 計算次數處理
        var count = $.cookie('nownews-coverAds') || 0;
        count++;
        $.cookie('nownews-coverAds', count, { expires: 1, path: '/' });

        var dfpCover = function () {
            var closeAdsCover = function () {
                $('#mui-overlay').attr('id', '').removeClass('mui--show');
                $('body').removeClass('mui-body--scroll-lock');
            };
            $('.ads-cover.dfp').attr('id', 'mui-overlay').addClass('mui--show');
            $('#mui-overlay').append('<a class="close"><img src="/static/img/icon-close.png"/></a>');
            $('#mui-overlay > div').css('position', 'absolute');

            var adsWidthHalf = 0 - $('#mui-overlay > div').width()/2;
            var adsHeightHalf = 0 - $('#mui-overlay > div').height()/2;
            if(adsHeightHalf){
                $('body').addClass('mui-body--scroll-lock');
            }
            $('#mui-overlay > div')
                .css('top', '50%')
                .css('left', '50%')
                .css('margin-left', adsWidthHalf)
                .css('margin-top', adsHeightHalf);

            $('#mui-overlay').on('click', closeAdsCover);
            $('.ads-cover .close').on('click', closeAdsCover);
        };

        if (count === 1 || count === 3 || count === 5 || count === 7 ) {
            $window.load(function() {
                var hasDFP = $('.ads-cover.dfp > div').css('display') === 'none' ? false : true;
                // 如果沒有 dfp 廣告就塞入成果的廣告碼
                if (hasDFP) {
                    dfpCover();
                    return;
                }
                /* one ad 廣告先隱蔽 */
                for (var i = 0; i < window.ONEADs.length; i++) {
                    if (window.ONEADs[i].play_mode === 'mobile-incover') {
                        window.ONEADs[i].ONEAD_expand_slot();
                    }
                }
            });
        }
    }

    // 反饋感
    $('.category-select li a').on('click', function(){
        if ($(this).parent().hasClass('near-by-news')) {
            return;
        }
        event.preventDefault();
        $(this).parent().addClass('.isActive').siblings('.isActive').removeClass('isActive');
        location.href = $(this).attr('href');
    });

    // 新聞列表輪播的特效
    $('.single-item').slick({
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false
    });

    // 圖集換頁的特效
    $('.slick-photos').slick({
        lazyLoad: 'progressive',
        adaptiveHeight: true
    });
    $('.slick-photos').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#photo-one-bar span').html(nextSlide + 1);
    });

    // 在圖片確認 load 三張以後再加上左右的箭頭
    var photosIndex = 0;
    $('.slick-photos').on('lazyLoaded', function(event, slick, image, imageSource) {
        photosIndex++;
        if (photosIndex === 3) {
            $('.slick-photos .slick-next').css('background-image', 'url(/static/img/slick-next.png)');
            $('.slick-photos .slick-prev').css('background-image', 'url(/static/img/slick-prev.png)');
        }
    });

    // 文章文字大小調整
    var nownewsFontSize = $.cookie('m-nownewsFontSize');
    var newsBodyDom = $('.news-body').length > 0;
    if (newsBodyDom && nownewsFontSize) {
        var beforeClass = $('.news-body').attr('class').match(/font-size-[a-z]+/g) || [];
        $('.news-body').removeClass(beforeClass[0]).addClass(nownewsFontSize);
    }
    $('.font-size-controllers .font-link').on('click', function() {
        $.cookie('m-nownewsFontSize', $(this).attr('class').match(/font-size-[a-z]+/g)[0], { path: '/' });
        var fontClass = $(this).attr('class').match(/font-size-[a-z]+/g);
        var beforeClass = $('.news-body').attr('class').match(/font-size-[a-z]+/g) || [];
        $('.news-body').removeClass(beforeClass[0]).addClass(fontClass[0]);
    });

    function switchHeaderBarTo(selecter) {
        $(selecter).removeClass('mui--hide');
        $('#header-bar').addClass('mui--hide');
    }

    function switchToHeaderBar(selecter) {
        $(selecter).addClass('mui--hide');
        $('#header-bar').removeClass('mui--hide');
    }

    // 搜尋開啟
    $('#header-bar .fa-search-area').on('click', function() {
        switchHeaderBarTo('#search-bar');
    });

    // 搜尋關閉
    $('#search-bar .fa-close-area').on('click', function() {
        $('#search-input').val('');
        switchToHeaderBar('#search-bar');
    });

    // 漢堡選單開啟
    $('#header-bar .fa-bars-area').on('click', function() {
        switchHeaderBarTo('#menu-nav-bar');
        $('#menu-nav').removeClass('mui--hide');
    });

    // 漢堡選單關閉
    $('#menu-nav-bar .fa-close-area').on('click', function() {
        switchToHeaderBar('#menu-nav-bar');
        $('#menu-nav').addClass('mui--hide');
    });

    // 開關 channel nav
    $('#channel-nav-block > .mui-panel').on('click', function() {
        $('#channel-nav-block').toggleClass('is-open');
        $(this).find('.channel-name').toggleClass('mui--hide');
        $(this).find('i').toggleClass('fa-rotate-270');
        return;
    });

    var beforeScrollTop = 0,
        scrollCheckTimer = null,
        scrollDelay = 200;

    // 偵測 scroll 事件
    var $adsBottom = $('.ads-block.fixed-bottom');
    var adsBottomDom = $adsBottom.length > 0;
    var scrollStopped;
    var adsBottomScrollFunc = function() {
        var fadeInCallback = function() {
            if (typeof scrollStopped !== 'undefined') {
                clearInterval(scrollStopped);
                $adsBottom.addClass('mui--hide');
            }

            scrollStopped = setTimeout(function() {
                $adsBottom.removeClass('mui--hide');
            }, 800);
        };
        fadeInCallback.call(this);
    };

    if (adsBottomDom) {
        $('.custom-space').css('height', 50);
        $window.on('scroll', adsBottomScrollFunc);
    }

    // nav 的 category 置中
    function navCategoryCenter() {
        var $nav = $('.category-select > ul');
        var isActivePosition = $nav.find('.isActive').offset().left;
        var mobileWidthHalf = $window.width() / 2;
        var itemWidthHalf = $nav.find('li').outerWidth() / 2;

        // 如果是小於一半的分類往左推自己寬度的 1/2（估計值）;
        if (isActivePosition < mobileWidthHalf) {
            return $nav.scrollLeft(isActivePosition / 2);
        }

        return $nav.scrollLeft(isActivePosition - mobileWidthHalf + itemWidthHalf);
    }
    var navDom = $('.category-select > ul').length > 0;
    if (navDom) {
        navCategoryCenter();
    }

    // social 在 safari 會出現 img, 所以要隱藏起來
    $window.load(function() {
        $('img[src="http://load.s3.amazonaws.com/pixel.gif"]').hide();
    });

    // 滑到底去抓新聞
    var page = 1;
    var hasListWrapperDom = $('#list-wrapper').length > 0;
    if (hasListWrapperDom){
        $window.scroll(function() {
            if ($(document).height() - $window.height() === $window.scrollTop()) {
                $('#loading').removeClass('mui--hide');
                page++;
                $.ajax({
                    url: '/ajaxPost?page=' + page + '&url=' + location.pathname,
                    dataType: 'html',
                    success: function(html) {
                        $('#list-wrapper').append(html);
                        $('#loading').addClass('mui--hide');
                    }
                });

            }
        });
    }

    //NAV上下滑動收縮使用
    $('.category-select').addClass('nav-down');
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.category-select').outerHeight();

    $window.scroll(function(event){
        didScroll = true;
    });

    function hasScrolled() {
        var st = $(this).scrollTop();
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta){
            return;
        }

        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('.category-select').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if(st + $window.height() < $(document).height()) {
                $('.category-select').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
    }

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 50);

    // 上一篇下一篇的回饋感
    var arrowBtns = document.getElementsByClassName('arrow-btn');

    if (arrowBtns.length > 0) {

        var arrowStartHandler = function (event) {
            $(event.currentTarget).addClass('is-active');
        };

        var arrowEndHandler = function (event) {
            $(event.currentTarget).removeClass('is-active');
        };

        arrowBtns[0].addEventListener('touchstart', arrowStartHandler, false);
        arrowBtns[1].addEventListener('touchstart', arrowStartHandler, false);
        arrowBtns[0].addEventListener('touchend', arrowEndHandler, false);
        arrowBtns[1].addEventListener('touchend', arrowEndHandler, false);
    }
});
