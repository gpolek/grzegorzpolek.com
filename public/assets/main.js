module = {}

requirejs(['http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.2.1/underscore-min.js'], function(util) {

    require(['underscore'], function(_) {
        window._ = _;
    });

    require(['parser/parser'], function(parser) {
        window._ = _;
    });

});

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function help(term) {
    term.echo("");
}

(function($) {
    "use strict";

    $('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 40
                }, 900);
                return false;
            }
        }
    });

    /* White Background on Scroll */
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 650;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });

    $('body').scrollspy({
        target: '.navbar-default',
        offset: 80
    })

    /* PAGE LOADER */
    $('.loader').fadeOut(); // will first fade out the loading animation
    $('.preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });

    /* WOW */
    new WOW().init();

    /* Testimonial Carousel */
    $("#testimonial").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });

    /* Team Carousel */
    $(".team").owlCarousel({

          navigation : false, // Show next and prev buttons
          pagination : false,
          slideSpeed : 300,
          paginationSpeed : 400,
          autoHeight : true,
          itemsCustom : [
                        [0, 1],
                        [450, 2],
                        [600, 2],
                        [700, 2],
                        [1000, 3],
                        [1200, 3],
                        [1400, 3],
                        [1600, 3]
                      ],
    });

    /* Skills */
    $('.skills .skills-item').each(function() {
        var progress = $(this).data('progress');
        $(this).css('width', progress + '%');
    });

    /* Isotope Filter */
    $(window).load(function(){
    var $container2 = $('#blog-masonry');
      $container2.isotope({
          itemSelector: '.blog'
      });
    });
    $(window).load(function() {
        var $container = $('#lightbox');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });

    $(document).on({
        click: function(e) {
            if($(this).parent().hasClass('visible')) {
                $(this).parent().animate({
                    'margin-bottom': '-=' + ($(this).parent().outerHeight())
                });
                $(this).parent().removeClass('visible');
                $(this).find('strong').text('OPEN');
            } else {
                $(this).parent().animate({
                    'margin-bottom': '+=' + ($(this).parent().outerHeight())
                });
                $(this).parent().addClass('visible');
                $(this).find('strong').text('CLOSE');
            }
        }
    }, "#terminal_handle");

    jQuery(function($, undefined) {
        $('#terminal_content').terminal(function(command, term) {
            if (command !== '') {
                try {
                    var result = window.eval(command);
                    if(isFunction(result)) {
                        term.echo(result(term))
                    } else {
                        if (result !== undefined) {
                            term.echo(new String(result));
                        }
                    }
                } catch(e) {
                    if (e instanceof TypeError) {
                        term.error(new String(e));
                    } else if (e instanceof ReferenceError) {
                        term.error(command + ': command not found');
                    } else {
                        term.error(new String(e));
                    }
                }
            } else {
               term.echo('');
            }
        }, {
            greetings: 'Type `help` to get started...\n',
            name: 'terminal',
            height: 200,
            prompt: '$ '});
    });

})(jQuery);
