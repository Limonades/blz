import $ from 'jquery';
import jQuery from 'jquery';
// import whatInput from 'what-input';

window.$ = $;
window.jQuery = jQuery;

// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below

import './lib/foundation-explicit-pieces';
import './lib/jquery.fancybox';
import 'jquery-match-height';
import './lib/form-styler';

$(document).foundation();

$(document).ready(function() {

    // custom selectt
    (function($) {
        $(function() {
            $('select').styler({
                selectPlaceholder: false,
                onSelectOpened: function() {
                    $('.jq-selectbox__trigger-arrow').addClass('--up');
                },
                onSelectClosed: function() {
                    $('.jq-selectbox__trigger-arrow').removeClass('--up');
                }
            });
        });
    })(jQuery);

    // fancy
    $('.we__video-overlay').fancybox({
        youtube : {
            showinfo : 0
        }
    });

    // same height for event blocks
    $('.event-block__txt-wrap').matchHeight();
    $('.txt-photos__block-description   ').matchHeight();

    $('.hamburger-wrap').on('click', function() {
        $('.hamburger-menu').toggleClass('--open');
        $('.mobile-menu').toggleClass('--open');
        $('nav').toggleClass('--menu-open');
        $('body').toggleClass('--no-scroll')
    });

    // guide dropdown on mobile and tablet
    $('.guide__drop').on('click', function() {
        $('.guide__list').toggleClass('--open');
        $('.guide__drop-title').toggleClass('--hide');
        $('.guide__drop-icon').toggleClass('--up');
    });

    // let sticky block works on guide page
    if ( $("#guide").length ) {
        $('.page-content').addClass('--ov');
    }

    // close drop by click out the target
    $(document).click(function (e) {
        if ($('.guide__list.--open').length) {
            e.stopPropagation();

            if ( $(".guide__drop").has(e.target).length === 0 ) {
                $('.guide__list').removeClass('--open');
                $('.guide__drop-title').removeClass('--hide');
                $('.guide__drop-icon').removeClass('--up');
            }
        }
    });

    // animated scroll on guide page and close drop on mobile and tablet
    $('.guide__list-btn').on('click', function(e) {

        e.preventDefault();

        var target = $(this).attr("href");

        if(window.matchMedia('(min-width: 1024px)').matches) {
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top - 90
            }, 600 /*, function() {
                location.hash = target; <--comment out if we need to change url by click
            }*/);
        } else {
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top - 150
            }, 600);

            $('.guide__list').removeClass('--open');
            $('.guide__drop-title').removeClass('--hide');
            $('.guide__drop-icon').removeClass('--up');
        }

        return false;
    });
});


$(window).scroll(function(){

    // fixed navigation
    if ($(this).scrollTop() > 100) {
        $('nav').addClass('--fixed');
    } else if ($(this).scrollTop() < 100) {
        $('nav').removeClass('--fixed');
    }

    if ($(this).scrollTop() > 150) {
        $('nav').addClass('--animated');
    } else if ($(this).scrollTop() < 150) {
        $('nav').removeClass('--animated');
    }

    // sticky sidebar on guide page
    if ( $("#guide").length ) {
        if( $(window).scrollTop() >= $("#guide").offset().top ) {
            $('.guide__drop').addClass('--sticky');
        } else {
            $('.guide__drop').removeClass('--sticky');
        }

        if( $(window).scrollTop() >= $("#guide").offset().top + 50 ) {
            $('.guide__drop').addClass('--animated');
        } else {
            $('.guide__drop').removeClass('--animated');
        }
    }

    // active items on sidebar on guide by scroll
    $('.guide__info').each(function(i) {

        if(window.matchMedia('(min-width: 1024px)').matches) {
            if ($(this).position().top + 400 <= $(window).scrollTop()) {
                $('.guide__list-btn.--active').removeClass('--active');
                $('.guide__list-btn').eq(i).addClass('--active');
            }
        } else {
            if ($(this).position().top + 200 <= $(window).scrollTop()) {
                $('.guide__list-btn.--active').removeClass('--active');
                $('.guide__list-btn').eq(i).addClass('--active');

                $('.guide__drop-title').text( $(this).find('.guide__info-title').text() );
            }
        }
    });
});