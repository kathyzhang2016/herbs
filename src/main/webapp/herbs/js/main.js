(function($){


    /* ---------------------------------------------------------------------------
     * Helper Item
     * --------------------------------------------------------------------------- */

    $('.helper .link.toggle').click( function(e){

        e.preventDefault();

        var el = $(this);
        var id = el.attr('data-rel');
        var parent = el.closest('.helper');

        if( el.hasClass('active') ){

            el.removeClass('active');
            parent.find('.helper_content > .item-' + id ).removeClass('active').slideUp(200);

        } else {

            parent.find('.links > .link.active').removeClass('active');
            parent.find('.helper_content > .item.active').slideUp(200)

            el.addClass('active');
            parent.find('.helper_content > .item-' + id ).addClass('active').slideDown(200);

        }

        setTimeout(function(){
            mfn_sidebar();
        },200);

    });


    "use strict";
    $(window).bind("debouncedresize", function() {

        iframesHeight();

        // Isotope | Relayout
        $('.masonry.isotope').isotope();
        $('.masonry.gallery').isotope( 'layout');

        // Zoom Box | Vertical Align
        zoomBoxVerticalAlign();

    });
    /* ---------------------------------------------------------------------------
     * Zoom Box | Vertical Align
     * --------------------------------------------------------------------------- */
    function zoomBoxVerticalAlign(){
        $('body:not(.style-simple) .zoom_box').each(function(){

            var el = $(this);
            var elH = el.height();
            var desc = el.find('.desc_wrap');
            var descH = desc.height();

            var padding = ( elH - descH ) / 2;

            desc.css( 'padding-top', padding +'px' );

        });
    }
    zoomBoxVerticalAlign();

    /* ---------------------------------------------------------------------------
     * Iframe height
     * --------------------------------------------------------------------------- */
    function iframeHeight( item, ratio ){
        var itemW = item.width();
        var itemH = itemW * ratio;
        if( itemH < 147 ) itemH = 147;
        item.height(itemH);
    }

    function iframesHeight(){
        iframeHeight($(".blog_wrapper .post-photo-wrapper .mfn-jplayer, .blog_wrapper .post-photo-wrapper iframe, .post-related .mfn-jplayer, .post-related iframe, .blog_slider_ul .mfn-jplayer, .blog_slider_ul iframe"), 0.78);	// blog - list
        iframeHeight($(".single-post .single-photo-wrapper .mfn-jplayer, .single-post .single-photo-wrapper iframe" ), 0.4);	// blog - single

        iframeHeight($(".section-portfolio-header .mfn-jplayer, .section-portfolio-header iframe" ), 0.4);	// portfolio - single
    }
    iframesHeight();


    /* ---------------------------------------------------------------------------
     * Sticky header
     * --------------------------------------------------------------------------- */
    var topBarTop = '61px';
    var mfn_header_height = 0;

    // header height
    function mfn_stickyH(){
        if( $('body').hasClass('header-below') ){
            // header below slider
            mfn_header_height = $('.mfn-main-slider').innerHeight() + $('#Header').innerHeight();
        } else {
            // default
            mfn_header_height = $('#Top_bar').innerHeight() + $('#Action_bar').innerHeight();
        }
    }

    // init
    function mfn_sticky(){
        if( $('body').hasClass('sticky-header') ){
            var start_y = mfn_header_height;
            var window_y = $(window).scrollTop();

            if( window_y > start_y ){
                if( ! ($('#Top_bar').hasClass('is-sticky'))){

                    $('.header-classic .header_placeholder').css('height', $('#Top_bar').innerHeight() - $('#Action_bar').innerHeight());
                    $('.header-stack   .header_placeholder').css('height', 71);
                    $('.header-below   .header_placeholder').css('height', $('#Top_bar').innerHeight());
                    $('.minimalist-header .header_placeholder').css('height', $('#Top_bar').innerHeight());

                    $('#Top_bar')
                        .addClass('is-sticky')
                        .css('top',-60)
                        .animate({
                            'top': $('#wpadminbar').innerHeight()
                        },300);
                }
            }
            else {
                if($('#Top_bar').hasClass('is-sticky')) {
                    $('.header_placeholder').css('height',0);
                    $('#Top_bar')
                        .removeClass('is-sticky')
                        .css('top', topBarTop);
                }
            }
        }
    }


    /* ---------------------------------------------------------------------------
     * Sidebar height
     * --------------------------------------------------------------------------- */
    function mfn_sidebar(){
        if( $('.with_aside .four.columns').length ){
            var maxH = $('#Content .sections_group').height() - 20
            $('.with_aside .four.columns .widget-area').each(function(){
                $(this).css( 'min-height', 0 );
                if( $(this).height() > maxH ){
                    maxH = $(this).height();
                }
            });
            $('.with_aside .four.columns .widget-area').css( 'min-height', maxH + 'px' );
        }
    }



    /* ---------------------------------------------------------------------------
     * Equal Wraps | Height
     * --------------------------------------------------------------------------- */
    function mfn_equalH_wrap(){
        $('.section.equal-height-wrap .section_wrapper').each(function(){
            var maxH = 0;
            $('> .wrap', $(this) ).each(function(){
                $(this).css( 'height', 'auto' );
                if( $(this).innerHeight() > maxH ){
                    maxH = $(this).innerHeight();
                }
            });
            $('> .wrap', $(this) ).css( 'height', maxH + 'px' );
        });
    }


    /* ---------------------------------------------------------------------------
     * Equal Items | Height
     * --------------------------------------------------------------------------- */
    function mfn_equalH(){
        $('.section.equal-height .mcb-wrap-inner').each(function(){
            var maxH = 0;

            $('> .column', $(this) ).each(function(){
                $(this).css( 'height', 'auto' );
                if( $(this).height() > maxH ){
                    maxH = $(this).height();
                }
            });
            $('> .column', $(this) ).css( 'height', maxH + 'px' );
        });
    }



    /* ---------------------------------------------------------------------------
     * Overlay menu
     * --------------------------------------------------------------------------- */
    $('.overlay-menu-toggle').click(function(e){
        e.preventDefault();

        $(this).toggleClass('focus');
        $('#Overlay').stop(true,true).fadeToggle(500);

        var menuH = $('#Overlay nav').height() / 2;
        $('#Overlay nav').css( 'margin-top', '-' + menuH + 'px' );
    });

    /* ---------------------------------------------------------------------------
     * Sliding Footer | Height
     * --------------------------------------------------------------------------- */
    function mfn_footer(){
        if( $('.footer-fixed #Footer, .footer-sliding #Footer').length ){
            var footerH = $('#Footer').height();
            $('#Content').css( 'margin-bottom', footerH + 'px' );
        }
    }


    /* ---------------------------------------------------------------------------
     * Header width
     * --------------------------------------------------------------------------- */
    function mfn_header(){
        var rightW = $('.top_bar_right').innerWidth();
        var parentW = $('#Top_bar .one').innerWidth() - 10;
        var leftW = parentW - rightW;
        $('.top_bar_left, .menu > li > ul.mfn-megamenu ').width( leftW );
    }


    /* ---------------------------------------------------------------------------
     * Full Screen Section
     * --------------------------------------------------------------------------- */
    function mfn_sectionH(){
        var windowH = $(window).height();
        $('.section.full-screen').each(function(){
            var section = $(this);
            var wrapper = $('.section_wrapper',section);
            section
                .css('padding', 0)
                .height( windowH );
            var padding = ( windowH - wrapper.height() ) / 2;
            wrapper.css('padding-top', padding + 20);			// 20 = column margin-bottom / 2
        });
    }


    /* ---------------------------------------------------------------------------
     * # Hash smooth navigation
     * --------------------------------------------------------------------------- */
    function hashNav(){

        // # window.location.hash
        var hash = window.location.hash;

        if( hash && $(hash).length ){

            var stickyH = $('.sticky-header #Top_bar').innerHeight();
            var tabsHeaderH = $(hash).siblings('.ui-tabs-nav').innerHeight();

            $('html, body').animate({
                scrollTop: $(hash).offset().top - stickyH - tabsHeaderH
            }, 500);
        }
    }


    /* ---------------------------------------------------------------------------
     * One Page | Scroll Active
     * --------------------------------------------------------------------------- */
    function onePageActive(){
        if( $('body').hasClass('one-page') ){

            var stickyH = $('.sticky-header #Top_bar').innerHeight();

            var winTop = $(window).scrollTop();
            var offset = stickyH + 1; // offset top

            var visible = $('[data-id]').filter(function(ndx, div){
                return winTop >= $(div).offset().top - offset &&
                    winTop < $(div).offset().top - offset + $(div).outerHeight()
            });

            var newActive = visible.first().attr('id');
            var active = '[data-hash="#'+ newActive +'"]';

            if( newActive ){
                var menu = $('#menu');
                menu.find('li').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');
                $( active, menu ).closest('li').addClass('current-menu-item');
            }

        }
    }


    /* ---------------------------------------------------------------------------
     * niceScroll | Padding right fix for short content
     * --------------------------------------------------------------------------- */
    function niceScrollFix(){
        var el = $('body > .nicescroll-rails');
        if( el.length ){
            if( el.is(":visible") ){
                $('body').addClass('nice-scroll');
            } else {
                $('body').removeClass('nice-scroll');
            }
        }
    }


    /* --------------------------------------------------------------------------------------------------------------------------
     * $(document).ready
     * ----------------------------------------------------------------------------------------------------------------------- */
    $(document).ready(function(){

        topBarTop = parseInt($('#Top_bar').css('top'), 10);
        if( topBarTop < 0 ) topBarTop = 61;
        topBarTop = topBarTop + 'px';



        /* ---------------------------------------------------------------------------
         * TwentyTwenty [ before_after ]
         * --------------------------------------------------------------------------- */
        $('.before_after.twentytwenty-container').twentytwenty();


        /* ---------------------------------------------------------------------------
         * Content sliders
         * --------------------------------------------------------------------------- */
        mfnSliderContent();
        mfnSliderOffer();
        mfnSliderOfferThumb();
        mfnSliderBlog();
        mfnSliderClients();
        mfnSliderPortfolio();
        mfnSliderShop();
        mfnSliderTestimonials();
        mfn_equalH_wrap();
        mfn_equalH();


        /* ---------------------------------------------------------------------------
         * Responsive menu
         * --------------------------------------------------------------------------- */
        $('.responsive-menu-toggle').click(function(e){
            e.preventDefault();
            var el = $(this)
            var menu = $('#Top_bar #menu');
            var menuWrap = menu.closest('.menu_wrapper');
            el.toggleClass('active');

            if( el.hasClass('is-sticky') && el.hasClass('active') ){
                var top = 0;
                if( menuWrap.length ) top = menuWrap.offset().top;
                $('body,html').animate({
                    scrollTop: top
                }, 200);
            }

            menu.stop(true,true).slideToggle(200);
        });

        /* ---------------------------------------------------------------------------
         * Menu | Responsive | Side Slide
         * --------------------------------------------------------------------------- */

        function sideSlide(){

            var slide 	= $( '#Side_slide' );
            var overlay = $( '#body_overlay' );
            var pos 	= 'right';


            // constructor ----------

            var constructor = function(){
                if( ! slide.hasClass( 'enabled' ) ){
                    $( 'nav#menu' ).detach().appendTo( '#Side_slide .menu_wrapper' );
                    slide.addClass( 'enabled' );
                }
            };


            // destructor ----------

            var destructor = function(){
                if( slide.hasClass( 'enabled' ) ){
                    close();
                    $( 'nav#menu' ).detach().prependTo( '#Top_bar .menu_wrapper' );
                    slide.removeClass( 'enabled' );
                }
            };


            // reload ----------

            var reload = function(){
                if( ( $(window).width() < mobile_init_W ) ){
                    constructor();
                } else {
                    destructor();
                }
            };


            // init ----------

            var init = function(){
                if( slide.hasClass( 'left' ) ){
                    pos = 'left';
                }

                if( $( 'body' ).hasClass( 'header-simple' ) ){
                    mobile_init_W = 9999;
                }
                else{
                    mobile_init_W = 1239;
                }

                reload();
            };


            // reset to default ----------

            var reset = function( time ){

                $( '.lang-active.active', slide ).removeClass('active').children('i').attr('class','icon-down-open-mini');
                $( '.lang-wrapper', slide ).fadeOut(0);

                $( '.icon.search.active', slide ).removeClass('active');
                $( '.search-wrapper', slide ).fadeOut(0);

                $( '.menu_wrapper, .social', slide ).fadeIn( time );

            };


            // menu button ----------

            var button = function(){

                // show
                if( pos == 'left' ){
                    slide.animate({ 'left':0 },300);
                    $('body').animate({ 'right':-125 },300);
                } else {
                    slide.animate({ 'right':0 },300);
                    $('body').animate({ 'left':-125 },300);
                }

                overlay.fadeIn(300);

                // reset
                reset(0);

            };


            // close ----------

            var close = function(){

                if( pos == 'left' ){
                    slide.animate({ 'left':-250 },300);
                    $('body').animate({ 'right':0 },300);
                } else {
                    slide.animate({ 'right':-250 },300);
                    $('body').animate({ 'left':0 },300);
                }

                overlay.fadeOut(300);
            };


            // search ----------

            $( '.icon.search', slide ).on( 'click', function(e){

                e.preventDefault();

                var el = $(this);

                if( el.hasClass('active') ){

                    $( '.search-wrapper', slide ).fadeOut(0);
                    $( '.menu_wrapper, .social', slide ).fadeIn(300);

                } else {

                    $( '.search-wrapper', slide ).fadeIn(300);
                    $( '.menu_wrapper, .social', slide ).fadeOut(0);

                    $( '.lang-active.active', slide ).removeClass('active').children('i').attr('class','icon-down-open-mini');
                    $( '.lang-wrapper', slide ).fadeOut(0);

                }

                el.toggleClass('active');
            });


            // search form submit ----------

            $( 'a.submit', slide ).on( 'click', function(e){
                e.preventDefault();
                $('#side-form').submit();
            });


            // lang menu ----------

            $( '.lang-active', slide ).on( 'click', function(e){
                e.preventDefault();

                var el = $(this);

                if( el.hasClass('active') ){

                    $( '.lang-wrapper', slide ).fadeOut(0);
                    $( '.menu_wrapper, .social', slide ).fadeIn(300);
                    el.children('i').attr('class','icon-down-open-mini');

                } else {

                    $( '.lang-wrapper', slide ).fadeIn(300);
                    $( '.menu_wrapper, .social', slide ).fadeOut(0);
                    el.children('i').attr('class','icon-up-open-mini');

                    $( '.icon.search.active', slide ).removeClass('active');
                    $( '.search-wrapper', slide ).fadeOut(0);

                }

                el.toggleClass('active');
            });


            // init, click, debouncedresize ----------

            // init

            init();

            // click | menu button

            $( '.responsive-menu-toggle' ).off( 'click' );

            $( '.responsive-menu-toggle' ).on( 'click', function(e){
                e.preventDefault();
                button();
            });

            // click | close

            overlay.on( 'click', function(e){
                close();
            });

            $( '.close', slide ).on( 'click', function(e){
                e.preventDefault();
                close();
            });

            // click | below search or languages menu

            $( slide ).on( 'click', function(e){
                if( $( e.target ).is( slide ) ){
                    reset(300);
                }
            });

            // debouncedresize

            $( window ).on( 'debouncedresize', reload );


        }

        if( $( 'body' ).hasClass( 'mobile-side-slide' ) ){
            sideSlide();
        }

        /* ---------------------------------------------------------------------------
         * Main menu
         * --------------------------------------------------------------------------- */

        // Muffin Menu -------------------------------
        $("#menu > ul.menu").muffingroup_menu({
            arrows	: true
        });

        $("#secondary-menu > ul.secondary-menu").muffingroup_menu();

        mfn_stickyH()
        mfn_sticky();


        /* ---------------------------------------------------------------------------
         * Menu | OnePage - remove active
         * Works with .scroll class
         * Since 4.8 replaced with admin option: Page Options / One Page [function: onePageMenu()]
         * --------------------------------------------------------------------------- */
        function onePageScroll(){
            if( ! $('body').hasClass('one-page') ){
                var menu = $('#menu');

                if( menu.find('li.scroll').length > 1 ){
                    menu.find('li.current-menu-item:not(:first)').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');

                    // menu item click
                    menu.find('a').click(function(){
                        $(this).closest('li').siblings('li').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');
                        $(this).closest('li').addClass('current-menu-item');
                    });
                }
            }
        }
        onePageScroll();


        /* ---------------------------------------------------------------------------
         * One Page | Menu with Active on Scroll
         * --------------------------------------------------------------------------- */
        function onePageMenu(){
            if( $('body').hasClass('one-page') ){

                var menu = $('#menu');

                // remove active
                menu.find('li').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');

                // add attr [data-hash]
                $('a[href]', menu).each(function(){

                    // data-hash
                    var url = $(this).attr('href');
                    var hash = '#' + url.split('#')[1];
                    if( hash && $(hash).length ){	// check if element with specified ID exists
                        $(this).attr('data-hash',hash);
                        $(hash).attr('data-id',hash);
                    }

                });

                // click
                $('#menu a[data-hash]').click(function(e){
                    e.preventDefault(); // only with: body.one-page

                    // active
                    menu.find('li').removeClass('current-menu-item');
                    $(this).closest('li').addClass('current-menu-item');

                    var hash = $(this).attr('data-hash');
                    var stickyH = 0;
                    var tabsHeaderH = $(hash).siblings('.ui-tabs-nav').innerHeight();

                    // FIX | sticky top bar height
                    var topBar = $('.sticky-header #Top_bar');
                    if( topBar.hasClass('is-sticky') ){
                        stickyH = $('.sticky-header #Top_bar').innerHeight();
                    } else {
                        topBar.addClass('is-sticky');
                        stickyH = $('.sticky-header #Top_bar').innerHeight();
                        topBar.removeClass('is-sticky');
                    }

                    // FIX | responsive
                    var responsive = $('.responsive-menu-toggle');
                    if( responsive.length ){
                        if( responsive.is(":visible") ){
                            stickyH = 0;
                        }
                    }

                    $('html, body').animate({
                        scrollTop: $(hash).offset().top - stickyH - tabsHeaderH
                    }, 500);

                });

            }
        };
        onePageMenu();



        /* ---------------------------------------------------------------------------
         * Creative Header
         * --------------------------------------------------------------------------- */
        var cHeader 	= 'body:not(.header-open) #Header_creative';
        var cHeaderEl 	= $( cHeader );
        var cHeaderCurrnet;

        function creativeHeader(){

            $('.creative-menu-toggle').click(function(e){
                e.preventDefault();

                cHeaderEl.addClass('active')

                if( $('body').hasClass('header-rtl') ){
                    cHeaderEl.animate({ 'right':-1 }, 500);
                } else {
                    cHeaderEl.animate({ 'left':-1 }, 500);
                }


                cHeaderEl.find('.creative-wrapper').fadeIn(500);
                cHeaderEl.find('.creative-menu-toggle, .creative-social').fadeOut(500);
            });

        }
        creativeHeader();

        $(document).on('mouseenter', cHeader, function() {
            cHeaderCurrnet = 1;
        })

        $(document).on('mouseleave', cHeader, function() {
            cHeaderCurrnet = null;
            setTimeout(function(){
                if ( ! cHeaderCurrnet ){

                    cHeaderEl.removeClass('active');

                    if( $('body').hasClass('header-rtl') ){
                        cHeaderEl.animate({ 'right':-200 }, 500);
                    } else {
                        cHeaderEl.animate({ 'left':-200 }, 500);
                    }

                    cHeaderEl.find('.creative-wrapper').fadeOut(500);
                    cHeaderEl.find('.creative-menu-toggle, .creative-social').fadeIn(500);
                }
            }, 1000);
        });



        /* ---------------------------------------------------------------------------
         * Maintenance
         * --------------------------------------------------------------------------- */
        $('.downcount').each(function(){
            var el = $(this);
            el.downCount({
                date	: el.attr('data-date'),
                offset	: el.attr('data-offset')
            });
        });


        /* ---------------------------------------------------------------------------
         * Tooltip Image
         * --------------------------------------------------------------------------- */
        $('.tooltip-img').hover(function(){
            $('.tooltip-content').stop(true,true).show();
        },function(){
            $('.tooltip-content').stop(true,true).hide();
        });


        /* ---------------------------------------------------------------------------
         * Popup Contact
         * --------------------------------------------------------------------------- */
        $("#popup_contact > a.button").click(function(e){
            e.preventDefault();
            $(this).parent().toggleClass('focus');
        });


        /* ---------------------------------------------------------------------------
         * niceScroll
         * --------------------------------------------------------------------------- */
        if( $('body').hasClass('nice-scroll-on')
            && $(window).width() > 767
            && ! navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/))
        {
            $('html').niceScroll({
                autohidemode		: false,
                cursorborder		: 0,
                cursorborderradius	: 5,
                cursorcolor			: '#222222',
                cursorwidth			: 10,
                horizrailenabled	: false,
                mousescrollstep		: ( window.mfn_nicescroll ) ? window.mfn_nicescroll : 40,
                scrollspeed			: 60
            });

            $('body').removeClass('nice-scroll-on').addClass('nice-scroll');
            niceScrollFix();
        }


        /* ---------------------------------------------------------------------------
         * WP Gallery
         * --------------------------------------------------------------------------- */
        $('.gallery-icon > a')
            .wrap('<div class="image_frame scale-with-grid"><div class="image_wrapper"></div></div>')
            .prepend('<div class="mask"></div>')
            .attr('rel', 'prettyphoto[gallery]')
            .attr('data-rel', 'prettyphoto[gallery]')
            .children('img' )
            .css('height', 'auto')
            .css('width', '100%');


        /* ---------------------------------------------------------------------------
         * PrettyPhoto
         * --------------------------------------------------------------------------- */

        if( ( typeof(window.mfn_prettyphoto) !== 'undefined' && ! window.mfn_prettyphoto.disable )  ){
            $('a[rel^="prettyphoto"],a.woocommerce-main-image.zoom, .prettyphoto, a[data-rel^="prettyPhoto[product-gallery]"]').prettyPhoto({
                default_width	: window.mfn_prettyphoto.width ? window.mfn_prettyphoto.width : 500,
                default_height	: window.mfn_prettyphoto.height ? window.mfn_prettyphoto.height : 344,
                show_title		: false,
                deeplinking		: false,
                social_tools: false
            });
        }


        /* ---------------------------------------------------------------------------
         * Black & White
         * --------------------------------------------------------------------------- */
        $('.greyscale .image_wrapper > a, .greyscale .client_wrapper .gs-wrapper, .greyscale.portfolio-photo a').has('img').BlackAndWhite({
            hoverEffect		: true,
            intensity		: 1			// opacity: 0, 0.1, ... 1
        });


        /* ---------------------------------------------------------------------------
         * Sliding Top
         * --------------------------------------------------------------------------- */
        $(".sliding-top-control").click(function(e){
            e.preventDefault();
            $('#Sliding-top .widgets_wrapper').slideToggle();
            $('#Sliding-top').toggleClass('active');
        });


        /* ---------------------------------------------------------------------------
         * Header Search
         * --------------------------------------------------------------------------- */
        $("#search_button, #Top_bar .icon_close").click(function(e){
            e.preventDefault();
            $('#Top_bar .search_wrapper').fadeToggle();
        });


        /* ---------------------------------------------------------------------------
         * Alert
         * --------------------------------------------------------------------------- */
        $('.alert .close').click(function(e){
            e.preventDefault();
            $(this).closest('.alert').hide(300);
        });


        /* ---------------------------------------------------------------------------
         * Buttons - mark Buttons with Icon & Label
         * --------------------------------------------------------------------------- */
        $('a.button_js').each(function(){
            var btn = $(this);
            if( btn.find('.button_icon').length && btn.find('.button_label').length ){
                btn.addClass('kill_the_icon');
            }
        });


        /* ---------------------------------------------------------------------------
         * Posts sticky navigation
         * --------------------------------------------------------------------------- */
        $('.fixed-nav').appendTo('body');


        /* ---------------------------------------------------------------------------
         * Feature List
         * --------------------------------------------------------------------------- */
        $('.feature_list ul li:nth-child(4n):not(:last-child)').after('<hr />');


        /* ---------------------------------------------------------------------------
         * IE fixes
         * --------------------------------------------------------------------------- */
        function checkIE(){
            // IE 9
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if( msie > 0 && parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 ){
                $("body").addClass("ie");
            }
        }
        checkIE();


        /* ---------------------------------------------------------------------------
         * Paralex Backgrounds
         * --------------------------------------------------------------------------- */
        var ua = navigator.userAgent,
            isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
        if( ! isMobileWebkit && $(window).width() >= 768 ){
            $.stellar({
                horizontalScrolling	: false,
                responsive			: true
            });
        }


        /* ---------------------------------------------------------------------------
         * Ajax | Load More
         * --------------------------------------------------------------------------- */
        $('.pager_load_more').click(function(e){
            e.preventDefault();

            var el = $(this);
            var pager = el.closest('.pager_lm');
            var href = el.attr('href');

            // index | for many items on the page
            var index = $('.lm_wrapper').index(el.closest('.isotope_wrapper').find('.lm_wrapper'));

            el.fadeOut(50);
            pager.addClass('loading');

            $.get( href, function(data){

                // content
                var content = $('.lm_wrapper:eq('+ index +')', data).wrapInner('').html();

                if( $('.lm_wrapper:eq('+ index +')').hasClass('isotope') ){
                    // isotope
                    $('.lm_wrapper:eq('+ index +')').append( $(content) ).isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
                } else {
                    // default
                    $( content ).hide().appendTo('.lm_wrapper:eq('+ index +')').fadeIn(1000);
                }

                // next page link
                href = $( '.pager_load_more:eq('+ index +')', data ).attr('href');
                pager.removeClass('loading');
                if( href ){
                    el.fadeIn();
                    el.attr( 'href', href );
                }

                // refresh some staff -------------------------------
                mfn_jPlayer();
                iframesHeight();
                mfn_sidebar();

                // isotope fix: second resize
                setTimeout(function(){
                    $('.lm_wrapper.isotope').isotope( 'reLayout');
                },1000);

            });

        });


        /* ---------------------------------------------------------------------------
         * Blog & Portfolio filters
         * --------------------------------------------------------------------------- */
        $('.filters_buttons .open').click(function(e){
            e.preventDefault();
            var type = $(this).closest('li').attr('class');
            $('.filters_wrapper').show(200);
            $('.filters_wrapper ul.'+ type).show(200);
            $('.filters_wrapper ul:not(.'+ type +')').hide();
        });

        $('.filters_wrapper .close a').click(function(e){
            e.preventDefault();
            $('.filters_wrapper').hide(200);
        });


        /* ---------------------------------------------------------------------------
         * Portfolio List - next/prev buttons
         * --------------------------------------------------------------------------- */
        $('.portfolio_next_js').click(function(e){
            e.preventDefault();

            var stickyH = $('#Top_bar.is-sticky').innerHeight();
            var item = $(this).closest('.portfolio-item').next();

            if( item.length ){
                $('html, body').animate({
                    scrollTop: item.offset().top - stickyH
                }, 500);
            }
        });

        $('.portfolio_prev_js').click(function(e){
            e.preventDefault();

            var stickyH = $('#Top_bar.is-sticky').innerHeight();
            var item = $(this).closest('.portfolio-item').prev();

            if( item.length ){
                $('html, body').animate({
                    scrollTop: item.offset().top - stickyH
                }, 500);
            }
        });


        /* ---------------------------------------------------------------------------
         * Tabs
         * --------------------------------------------------------------------------- */

        if(typeof(tabs) !== 'undefined'){
            $(".jq-tabs").tabs();
        }


        /* ---------------------------------------------------------------------------
         * Smooth scroll
         * --------------------------------------------------------------------------- */
        $('li.scroll > a, a.scroll').click(function(){
            var url = $(this).attr('href');
            var hash = '#' + url.split('#')[1];

            var stickyH = $('.sticky-header #Top_bar').innerHeight();
            var tabsHeaderH = $(hash).siblings('.ui-tabs-nav').innerHeight();

            if( hash && $(hash).length ){
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - stickyH - tabsHeaderH
                }, 500);
            }
        });


        /* ---------------------------------------------------------------------------
         * Muffin Accordion & FAQ
         * --------------------------------------------------------------------------- */
        $('.mfn-acc').each(function(){
            var el = $(this);

            if( el.hasClass('openAll') ){
                // show all -----------

                el.find('.question')
                    .addClass("active")
                    .children(".answer")
                    .show();

            } else {
                // show one -----------

                var active_tab = el.attr('data-active-tab');
                if( el.hasClass('open1st') ) active_tab = 1;

                if( active_tab ){
                    el.find('.question').eq( active_tab - 1 )
                        .addClass("active")
                        .children(".answer")
                        .show();
                }

            }
        });

        $(".mfn-acc .question > .title").click(function(){
            if($(this).parent().hasClass("active")) {
                $(this).parent().removeClass("active").children(".answer").slideToggle(200);
            }
            else
            {
                if( ! $(this).closest('.mfn-acc').hasClass('toggle') ){
                    $(this).parents(".mfn-acc").children().each(function() {
                        if($(this).hasClass("active")) {
                            $(this).removeClass("active").children(".answer").slideToggle(200);
                        }
                    });
                }
                $(this).parent().addClass("active");
                $(this).next(".answer").slideToggle(200);
            }
        });


        /* ---------------------------------------------------------------------------
         * jPlayer
         * --------------------------------------------------------------------------- */
        function mfn_jPlayer(){
            $('.mfn-jplayer').each(function(){
                var m4v = $(this).attr('data-m4v');
                var poster = $(this).attr('data-img');
                var swfPath = $(this).attr('data-swf');
                var cssSelectorAncestor = '#' + $(this).closest('.mfn-jcontainer').attr('id');

                $(this).jPlayer({
                    ready	: function () {
                        $(this).jPlayer('setMedia', {
                            m4v		: m4v,
                            poster	: poster
                        });
                    },
                    play	: function () { // To avoid both jPlayers playing together.
                        $(this).jPlayer('pauseOthers');
                    },
                    size: {
                        cssClass	: 'jp-video-360p',
                        width		: '100%',
                        height		: '360px'
                    },
                    swfPath				: swfPath,
                    supplied			: 'm4v',
                    cssSelectorAncestor	: cssSelectorAncestor,
                    wmode				: 'opaque'
                });
            });
        }
        mfn_jPlayer();


        /* ---------------------------------------------------------------------------
         * Love
         * --------------------------------------------------------------------------- */
        /*$('.mfn-love').click(function() {
         var el = $(this);
         if( el.hasClass('loved') ) return false;

         var post = {
         action: 'mfn_love',
         post_id: el.attr('data-id')
         };

         $.post(window.mfn_ajax, post, function(data){
         el.find('.label').html(data);
         el.addClass('loved');
         });

         return false;
         });	*/


        /* ---------------------------------------------------------------------------
         * Go to top
         * --------------------------------------------------------------------------- */
        $('#back_to_top').click(function(){
            $('body,html').animate({
                scrollTop: 0
            }, 500);
            return false;
        });


        /* ---------------------------------------------------------------------------
         * Section navigation
         * --------------------------------------------------------------------------- */
        $('.section .section-nav').click(function(){
            var el = $(this);
            var section = el.closest('.section');

            if( el.hasClass('prev') ){
                // Previous Section -------------
                if( section.prev().length ){
                    $('html, body').animate({
                        scrollTop: section.prev().offset().top
                    }, 500);
                }
            } else {
                // Next Section -----------------
                if( section.next().length ){
                    $('html, body').animate({
                        scrollTop: section.next().offset().top
                    }, 500);
                }
            }
        });


        /* ---------------------------------------------------------------------------
         * WooCommerce
         * --------------------------------------------------------------------------- */
        function addToCart(){
            $('body').on('click', '.add_to_cart_button', function(){
                $(this)
                    .closest('.product')
                    .addClass('adding-to-cart')
                    .removeClass('added-to-cart');
            });

            $('body').bind('added_to_cart', function() {
                $('.adding-to-cart')
                    .removeClass('adding-to-cart')
                    .addClass('added-to-cart');
            });
        }
        addToCart();


        /* ---------------------------------------------------------------------------
         * Iframe height
         * --------------------------------------------------------------------------- */
        function iframeHeight( item, ratio ){
            var itemW = item.width();
            var itemH = itemW * ratio;
            if( itemH < 147 ) itemH = 147;
            item.height(itemH);
        }

        function iframesHeight(){
            iframeHeight($(".blog_wrapper .post-photo-wrapper .mfn-jplayer, .blog_wrapper .post-photo-wrapper iframe, .post-related .mfn-jplayer, .post-related iframe, .blog_slider_ul .mfn-jplayer, .blog_slider_ul iframe"), 0.78);	// blog - list
            iframeHeight($(".single-post .single-photo-wrapper .mfn-jplayer, .single-post .single-photo-wrapper iframe" ), 0.4);	// blog - single

            iframeHeight($(".section-portfolio-header .mfn-jplayer, .section-portfolio-header iframe" ), 0.4);	// portfolio - single
        }
        iframesHeight();


        /* ---------------------------------------------------------------------------
         * Debouncedresize
         * --------------------------------------------------------------------------- */
        $(window).bind("debouncedresize", function() {

            iframesHeight();
            $('.masonry.isotope,.isotope').isotope();

            // carouFredSel wrapper Height set
            mfn_carouFredSel_height();

            // Sidebar Height
            mfn_sidebar();

            // Sliding Footer | Height
            mfn_footer();

            // Header Width
            mfn_header();

            // Full Screen Section
            mfn_sectionH();

            // niceScroll | Padding right fix for short content
            niceScrollFix();
        });

        /* ---------------------------------------------------------------------------
         * isotope
         * ---------------------------------------------------------------------------
         function isotopeFilter( domEl, isoWrapper ){
         var filter = domEl.attr('data-rel');
         isoWrapper.isotope({ filter: filter });
         }

         $('.isotope-filters .filters_wrapper').find('li:not(.close) a').click(function(e){
         e.preventDefault();
         isotopeFilter( $(this), $('.isotope') );
         });
         $('.isotope-filters .filters_buttons').find('li.reset a').click(function(e){
         e.preventDefault();
         isotopeFilter( $(this), $('.isotope') );
         });

         // carouFredSel wrapper | Height
         mfn_carouFredSel_height();

         // Sidebar | Height
         mfn_sidebar();

         // Sliding Footer | Height
         mfn_footer();

         // Header | Width
         mfn_header();

         // Full Screen Section
         mfn_sectionH();

         // Navigation | Hash
         hashNav();
         });
         */

        /* ---------------------------------------------------------------------------
         * Isotope
         * --------------------------------------------------------------------------- */

        // Isotope | Fiters
        function isotopeFilter( domEl, isoWrapper ){
            var filter = domEl.attr('data-rel');
            isoWrapper.isotope({ filter: filter });
        }

        // Isotope | Fiters | Click
        $('.isotope-filters .filters_wrapper').find('li:not(.close) a').click(function(e){
            e.preventDefault();

            var filters = $(this).closest('.isotope-filters');
            var parent  = filters.attr('data-parent');

            if( parent ){
                parent = filters.closest( '.' + parent );
                var isoWrapper = parent.find('.isotope').first()
            } else {
                var isoWrapper = $('.isotope');
            }

            filters.find('li').removeClass('current-cat');
            $(this).closest('li').addClass('current-cat');

            isotopeFilter( $(this), isoWrapper );
        });


        // Isotope | Fiters | Reset
        $('.isotope-filters .filters_buttons').find('li.reset a').click(function(e){
            e.preventDefault();

            $('.isotope-filters .filters_wrapper').find('li').removeClass('current-cat');
            isotopeFilter( $(this), $('.isotope') );
        });


        // carouFredSel wrapper | Height
        mfn_carouFredSel_height();

        // Sidebar | Height
        mfn_sidebar();

        // Sliding Footer | Height
        mfn_footer();

        // Header | Width
        mfn_header();

        // Full Screen Section
        mfn_sectionH();

        // Navigation | Hash
        hashNav();

        // Equal Columns | Height
        //mfn_equalH();
    });

    /* --------------------------------------------------------------------------------------------------------------------------
     * $(window).scroll
     * ----------------------------------------------------------------------------------------------------------------------- */
    $(window).scroll(function(){

        mfn_stickyH();

        mfn_sticky();
        onePageActive();
    });


    /* --------------------------------------------------------------------------------------------------------------------------
     * $(window).load
     * ----------------------------------------------------------------------------------------------------------------------- */
    $(window).load(function(){



        /* ---------------------------------------------------------------------------
         * Isotope
         * --------------------------------------------------------------------------- */
        // Portfolio - Isotope
        $('.portfolio_wrapper  .isotope:not(.masonry-flat)').isotope({
            itemSelector	: '.portfolio-item',
            layoutMode		: 'fitRows'
        });

        // Portfolio - Masonry Flat
        $('.portfolio_wrapper .masonry-flat').isotope({
            itemSelector	: '.portfolio-item',
            masonry			: {
                columnWidth: 1
            }
        });

        // Blog & Portfolio - Masonry
        $('.masonry.isotope').isotope({
            itemSelector	: '.isotope-item',
            layoutMode		: 'masonry'
        });


        /* ---------------------------------------------------------------------------
         * Chart
         * --------------------------------------------------------------------------- */
        $('.chart').waypoint({
            offset		: '100%',
            triggerOnce	: true,
            handler		: function(){
                var color = $(this).attr('data-color');
                $(this).easyPieChart({
                    animate		: 1000,
                    barColor	: color,
                    lineCap		: 'circle',
                    lineWidth	: 8,
                    size		: 140,
                    scaleColor	: false,
                    trackColor	: '#f8f8f8'
                });
            }
        });


        /* ---------------------------------------------------------------------------
         * Skills
         * --------------------------------------------------------------------------- */
        $('.bars_list').waypoint({
            offset		: '100%',
            triggerOnce	: true,
            handler		: function(){
                $(this).addClass('hover');
            }
        });


        /* ---------------------------------------------------------------------------
         * Progress Icons
         * --------------------------------------------------------------------------- */
        $('.progress_icons').waypoint({
            offset		: '100%',
            triggerOnce	: true,
            handler		: function(){

                var el = $(this);
                var active = el.attr('data-active');
                var color = el.attr('data-color');
                var icon = el.find('.progress_icon');
                var timeout = 200;		// timeout in milliseconds

                icon.each(function(i){
                    if( i < active ){
                        var time = (i+1) * timeout;
                        setTimeout(function(){
                            $(icon[i])
                                .addClass('themebg')
                                .css('background-color',color);
                        },time );

                    }
                });

            }
        });


        /* ---------------------------------------------------------------------------
         * Animate Math [counter, quick_fact, etc.]
         * --------------------------------------------------------------------------- */
        $('.animate-math .number').waypoint({
            offset		: '100%',
            triggerOnce	: true,
            handler		: function(){
                var el			= $(this);
                var duration	= Math.floor((Math.random()*1000)+1000);
                var to			= el.attr('data-to');

                $({property:0}).animate({property:to}, {
                    duration	: duration,
                    easing		:'linear',
                    step		: function() {
                        el.text(Math.floor(this.property));
                    },
                    complete	: function() {
                        el.text(this.property);
                    }
                });
            }
        });


        // carouFredSel wrapper | Height
        mfn_carouFredSel_height();

        // Sidebar | Height
        mfn_sidebar();

        // Sliding Footer | Height
        mfn_footer();

        // Header | Width
        mfn_header();

        // Full Screen Section
        mfn_sectionH();

        // Navigation | Hash
        hashNav();

        // niceScroll | Padding right fix for short content
        niceScrollFix();
    });


    /* --------------------------------------------------------------------------------------------------------------------------
     * $(document).mouseup
     * ----------------------------------------------------------------------------------------------------------------------- */
    $(document).mouseup(function(e){

        // search
        if( $("#searchform").has(e.target).length === 0 ){
            if( $("#searchform").hasClass('focus') ){
                $(this).find('.icon_close').click();
            }
        }

    });


    /* ---------------------------------------------------------------------------
     * Sliders configuration
     * --------------------------------------------------------------------------- */

    // carouFredSel wrapper Height set -------------------------------------------
    function mfn_carouFredSel_height(){
        $('.caroufredsel_wrapper > ul').each(function(){
            var el = $(this);
            var maxH = 0;
            el.children('li').each(function(){
                if( $(this).innerHeight() > maxH ){
                    maxH = $(this).innerHeight();
                }
            });
//			console.log(maxH);
            el.closest('.caroufredsel_wrapper').height( maxH );
        });

    }

    // --- Slider ----------------------------------------------------------------
    function mfnSliderContent(){
        $('.content_slider_ul').each(function(){

            if( $(this).closest('.content_slider').hasClass('carousel') ){
                var style = { min:1, max:6};
            } else {
                var style = 1;
            }

            // Init carouFredSel
            $( this ).carouFredSel({
                circular	: true,
                responsive	: true,
                items		: {
                    width	: 380,
                    visible	: style
                },
                scroll		: {
                    duration	: 500,
                    easing		: 'swing'
                },
                prev        : {
                    button		: function(){
                        return $(this).closest('.content_slider').find('.slider_prev');
                    }
                },
                next        : {
                    button		: function(){
                        return $(this).closest('.content_slider').find('.slider_next');
                    }
                },
                pagination	: {
                    container	: function(){
                        return $(this).closest('.content_slider').find('.slider_pagination');
                    }
                },
                auto		: {
                    play			: window.mfn_sliders.slider ? true : false,
                    timeoutDuration	: window.mfn_sliders.slider ? window.mfn_sliders.slider : 2500,
                },
                swipe		: {
                    onTouch		: true,
                    onMouse		: true,
                    onBefore	: function(){
                        $(this).find('a').addClass('disable');
                        $(this).find('li').trigger('mouseleave');
                    },
                    onAfter		: function(){
                        $(this).find('a').removeClass('disable');
                    }
                }
            });

            // Disable accidental clicks while swiping
            $(this).on('click', 'a.disable', function() {
                return false;
            });
        });
    }



    // --- Testimonials ----------------------------------------------------------------
    function mfnSliderTestimonials(){
        $('.testimonials_slider_ul').each(function(){

            // Init carouFredSel
            $(this).carouFredSel({
                circular	: true,
                responsive	: true,
                items		: {
                    visible	: 1,
                    width	: 100
                },
                scroll		: {
                    duration	: 500,
                    easing		: 'swing'
                },
                prev        : {
                    button		: function(){
                        return $(this).closest('.testimonials_slider').find('.slider_prev');
                    }
                },
                next        : {
                    button		: function(){
                        return $(this).closest('.testimonials_slider').find('.slider_next');
                    }
                },
                pagination	: {
                    container	: function(){
                        return $(this).closest('.testimonials_slider').find('.slider_pager');
                    },
                    anchorBuilder : false
                },
                auto		: {
                    play			: window.mfn_sliders.testimonials ? true : false,
                    timeoutDuration	: window.mfn_sliders.testimonials ? window.mfn_sliders.testimonials : 2500,
                },
                swipe		: {
                    onTouch		: true,
                    onMouse		: true,
                    onBefore	: function(){
                        $(this).find('a').addClass('disable');
                        $(this).find('li').trigger('mouseleave');
                    },
                    onAfter		: function(){
                        $(this).find('a').removeClass('disable');
                    }
                }
            });

            // Disable accidental clicks while swiping
            $(this).on('click', 'a.disable', function() {
                return false;
            });
        });
    }


    // --- Offer -----------------------------------------------------------------
    function mfnSliderOffer(){
        $('.offer_ul').each(function(){

            // Init carouFredSel
            $(this).carouFredSel({
                circular	: true,
                responsive	: true,
                items		: {
                    visible	: 1,
                    width	: 100
                },
                scroll		: {
                    duration	: 500,
                    easing		: 'swing',
                    onAfter		: function(){
                        $(this).closest('.offer').find('.current').text($(this).triggerHandler("currentPosition")+1);
                    }
                },
                prev        : {
                    button		: function(){
                        return $(this).closest('.offer').find('.slider_prev');
                    }
                },
                next        : {
                    button		: function(){
                        return $(this).closest('.offer').find('.slider_next');
                    }
                },
                auto		: {
                    play			: window.mfn_sliders.offer ? true : false,
                    timeoutDuration	: window.mfn_sliders.offer ? window.mfn_sliders.offer : 2500,
                },
                swipe		: {
                    onTouch		: true,
                    onMouse		: true,
                    onBefore	: function(){
                        $(this).find('a').addClass('disable');
                        $(this).find('li').trigger('mouseleave');
                    },
                    onAfter		: function(){
                        $(this).find('a').removeClass('disable');
                        $(this).closest('.offer').find('.current').text($(this).triggerHandler("currentPosition")+1);
                    }
                }
            });

            // Disable accidental clicks while swiping
            $(this).on('click', 'a.disable', function() {
                return false;
            });

            // Items count
            var count = $(this).children('.offer_li').length;
            $(this).closest('.offer').find('.count').text(count);
        });
    }


    function mfnSliderOfferThumb_Pager(nr) {
        var thumb = $(this).closest('.offer_thumb').find('.offer_thumb_li.id_'+ nr +' .thumbnail img').attr('src');
        return '<a href="#'+ nr +'"><img src="'+ thumb +'" alt="'+ nr +'" /></a>';
    }

    function mfnSliderOfferThumb(){
        $('.offer_thumb_ul').each(function(){

            // Init carouFredSel
            $(this).carouFredSel({
                circular	: true,
                responsive	: true,
                items		: {
                    visible	: 1,
                    width	: 100
                },
                pagination	: {
                    container		: $(this).closest('.offer_thumb').find('.slider_pagination'),
                    anchorBuilder	: mfnSliderOfferThumb_Pager
                },
                scroll		: {
                    duration	: 500,
                    easing		: 'swing',
                    onAfter		: function(){
                        $(this).closest('.offer_thumb').find('.current').text($(this).triggerHandler("currentPosition")+1);
                    }
                },
                auto		: {
                    play			: window.mfn_sliders.offer ? true : false,
                    timeoutDuration	: window.mfn_sliders.offer ? window.mfn_sliders.offer : 2500,
                },
                swipe		: {
                    onTouch		: true,
                    onMouse		: true,
                    onBefore	: function(){
                        $(this).find('a').addClass('disable');
                        $(this).find('li').trigger('mouseleave');
                    },
                    onAfter		: function(){
                        $(this).find('a').removeClass('disable');
                        $(this).closest('.offer_thumb').find('.current').text($(this).triggerHandler("currentPosition")+1);
                    }
                }
            });

            // Disable accidental clicks while swiping
            $(this).on('click', 'a.disable', function() {
                return false;
            });
        });
    }


    // --- Blog ------------------------------------------------------------------
    function mfnSliderBlog(){
        $('.blog_slider_ul').each(function(){

            // Init carouFredSel
            $(this).carouFredSel({
                circular	: true,
                responsive	: true,
                items		: {
                    width : 380,
                    visible	: {
                        min		: 1,
                        max		: 4
                    }
                },
                scroll		: {
                    duration	: 500,
                    easing		: 'swing'
                },
                prev        : {
                    button		: function(){
                        return $(this).closest('.blog_slider').find('.slider_prev');
                    }
                },
                next        : {
                    button		: function(){
                        return $(this).closest('.blog_slider').find('.slider_next');
                    }
                },
                pagination	: {
                    container	: function(){
                        return $(this).closest('.blog_slider').find('.slider_pagination');
                    }
                },
                auto		: {
                    play			: window.mfn_sliders.blog ? true : false,
                    timeoutDuration	: window.mfn_sliders.blog ? window.mfn_sliders.blog : 2500,
                },
                swipe		: {
                    onTouch		: true,
                    onMouse		: true,
                    onBefore	: function(){
                        $(this).find('a').addClass('disable');
                        $(this).find('li').trigger('mouseleave');
                    },
                    onAfter		: function(){
                        $(this).find('a').removeClass('disable');
                    }
                }
            });

            // Disable accidental clicks while swiping
            $(this).on('click', 'a.disable', function() {
                return false;
            });
        });
    }


    // --- Clients ------------------------------------------------------------------
    function mfnSliderClients(){
        $('.clients_slider_ul').each(function(){

            // Init carouFredSel
            $(this).carouFredSel({
                circular	: true,
                responsive	: true,
                items		: {
                    width : 380,
                    visible	: {
                        min		: 1,
                        max		: 4
                    }
                },
                scroll		: {
                    duration	: 500,
                    easing		: 'swing'
                },
                prev        : {
                    button		: function(){
                        return $(this).closest('.clients_slider').find('.slider_prev');
                    }
                },
                next        : {
                    button		: function(){
                        return $(this).closest('.clients_slider').find('.slider_next');
                    }
                },
                pagination	: {
                    container	: function(){
                        return $(this).closest('.clients_slider').find('.slider_pagination');
                    }
                },
                auto		: {
                    play			: window.mfn_sliders.clients ? true : false,
                    timeoutDuration	: window.mfn_sliders.clients ? window.mfn_sliders.clients : 2500,
                },
                swipe		: {
                    onTouch		: true,
                    onMouse		: true,
                    onBefore	: function(){
                        $(this).find('a').addClass('disable');
                        $(this).find('li').trigger('mouseleave');
                    },
                    onAfter		: function(){
                        $(this).find('a').removeClass('disable');
                    }
                }
            });

            // Disable accidental clicks while swiping
            $(this).on('click', 'a.disable', function() {
                return false;
            });
        });
    }


    // --- Shop ------------------------------------------------------------------
    function mfnSliderShop(){
        $('.shop_slider_ul').each(function(){

            // Init carouFredSel
            $(this).carouFredSel({
                circular	: true,
                responsive	: true,
                items		: {
                    width : 380,
                    visible	: {
                        min		: 1,
                        max		: 4
                    }
                },
                scroll		: {
                    duration	: 500,
                    easing		: 'swing'
                },
                prev        : {
                    button		: function(){
                        return $(this).closest('.shop_slider').find('.slider_prev');
                    }
                },
                next        : {
                    button		: function(){
                        return $(this).closest('.shop_slider').find('.slider_next');
                    }
                },
                pagination	: {
                    container	: function(){
                        return $(this).closest('.shop_slider').find('.slider_pagination');
                    }
                },
                auto		: {
                    play			: window.mfn_sliders.shop ? true : false,
                    timeoutDuration	: window.mfn_sliders.shop ? window.mfn_sliders.shop : 2500,
                },
                swipe		: {
                    onTouch		: true,
                    onMouse		: true,
                    onBefore	: function(){
                        $(this).find('a').addClass('disable');
                        $(this).find('li').trigger('mouseleave');
                    },
                    onAfter		: function(){
                        $(this).find('a').removeClass('disable');
                    }
                }
            });

            // Disable accidental clicks while swiping
            $(this).on('click', 'a.disable', function() {
//				return false;
            });
        });
    }


    // --- Portfolio -------------------------------------------------------------
    function mfnSliderPortfolio(){
        $('.portfolio_slider_ul').each(function(){

            // Init carouFredSel
            $(this).carouFredSel({
                circular	: true,
                responsive	: true,
                items		: {
                    width : 380,
                    visible	: {
                        min		: 1,
                        max		: 5
                    }
                },
                scroll		: {
                    duration	: 600,
                    easing		: 'swing'
                },
                prev        : {
                    button		: function(){
                        return $(this).closest('.portfolio_slider').find('.slider_prev');
                    }
                },
                next        : {
                    button		: function(){
                        return $(this).closest('.portfolio_slider').find('.slider_next');
                    }
                },
                auto		: {
                    play			: window.mfn_sliders.portfolio ? true : false,
                    timeoutDuration	: window.mfn_sliders.portfolio ? window.mfn_sliders.portfolio : 2500,
                },
                swipe		: {
                    onTouch		: true,
                    onMouse		: true,
                    onBefore	: function(){
                        $(this).find('a').addClass('disable');
                        $(this).find('li').trigger('mouseleave');
                    },
                    onAfter		: function(){
                        $(this).find('a').removeClass('disable');
                    }
                }
            });

            // Disable accidental clicks while swiping
            $(this).on('click', 'a.disable', function() {
                return false;
            });
        });
    }

    window.mfn_nicescroll = 25;
    window.mfn_prettyphoto = {
        disable : 0,
        width : 0,
        height : 0
    };
    window.mfn_sliders = {
        blog : 0,
        clients : 0,
        offer : 10000,
        portfolio : 0,
        shop : 0,
        slider : 6000,
        testimonials : 7000

    };




    $(document).ready(function($) {
        $('.masonry.isotope,.isotope').isotope();

        $('#configurator .control').click(function(e) {
            e.preventDefault();
            if ($('#configurator').hasClass('active')) {
                $('#configurator').removeClass('active').animate({
                    'right' : -272
                }, 500);
            } else {
                $('#configurator').addClass('active').animate({
                    'right' : -1
                }, 500);
            }
        });
        $('#mfn-demo-panel .control').click(function(e) {
            e.preventDefault();
            if ($('#mfn-demo-panel').hasClass('active')) {
                $('#mfn-demo-panel').removeClass('active').animate({
                    'right' : -367
                }, 500);
            } else {
                $('#mfn-demo-panel').addClass('active').animate({
                    'right' : -1
                }, 500);
            }
        });

        demosSliderH();
        /* ---------------------------------------------------------------------------
         * niceScroll
         * --------------------------------------------------------------------------- */
        $(".demos-slider").niceScroll({
            autohidemode		: false,
            cursorborder		: 0,
            cursorborderradius	: 5,
            cursorcolor			: '#222222',
            cursorwidth			: 0,
            horizrailenabled	: false,
            mousescrollstep		: 40,
            scrollspeed			: 60
        });


        /* ---------------------------------------------------------------------------
         * Paralex Backgrounds
         * --------------------------------------------------------------------------- */
        if (typeof stellar !== 'undefined' && $.isFunction(stellar)) {
            var ua = navigator.userAgent,
                isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

            if( ! isMobileWebkit && $(window).width() >= 768 ){

                if( window.mfn_parallax == 'stellar' ){

                    // Stellar
                    $.stellar({
                        horizontalScrolling	: false,
                        responsive			: true
                    });

                } else {

                    // Enllax
                    $(window).enllax();

                }

            } else {

                $('.section[data-enllax-ratio], .section[data-stellar-ratio]').css( 'background-attachment' , 'scroll' );

            }
        }




    });


})(jQuery);

function demosSliderH(){
    var panel = $('#mfn-demo-panel');
    var panelH = panel.height() - panel.find('.header').height();
    $(".demos-slider").height(panelH);
}
