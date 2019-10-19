$(document).ready(function () {
    var $sliderControl = $('[data-js-slide-control]');
    var $sliderPic = $('[data-js-slide="slider__pic__object"]');
    var $sliderBody = $('[data-js-slide="slider__info__body"]');
    $sliderControl.on('click',function (e) {
        let $control = $(this).find($(this).attr('data-js-slide-control')) ;
        let $targetIndex = $control.index(e.target);
        $control.removeClass('active');
        $control.eq($targetIndex).addClass('active');
        $sliderPic.children('.'+ $sliderPic.attr('data-js-slide')).eq(0).animate({marginLeft:'-'+ $targetIndex * 100 +'%'},1000);
        $sliderBody.children('.'+ $sliderBody.attr('data-js-slide')).eq(0).animate({marginLeft:'-'+ $targetIndex * 100 +'%'},1000);
        console.log('test');
    })
    $('.news-lazy__footer__more').on('click',function () {
        $('.news-lazy__footer').detach();
        $('.news-lazy__card').clone().appendTo('.news-lazy');
        return false;
    })
    var $cardSocial = $('[data-js-social="true"] a');
    $cardSocial.on('click',function () {
        $(this).toggleClass('active');
        return false;
    })
})