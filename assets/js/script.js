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
    var $searchCollapse = $('[data-js-search="collapse"]');
    $searchCollapse.on('click',function () {
        $(this).toggleClass('collapsed');
        $('.search__form').toggleClass('hide');
        return false;
    })
    var $inputSearch = $('[data-js-search="input"] input');
    $inputSearch.on('change',function () {
        if($(this).val()){
            $('.search__form__field__clear').addClass('cross');
            $('.pagination__result').removeClass('hide');
        } else {
            $('.search__form__field__clear').removeClass('cross');
            $('.pagination__result').addClass('hide');
        }
    })
    $('.search__form__field__clear').on('click',function () {
        if($(this).hasClass('cross')){
            $inputSearch.val('');
            $(this).removeClass('cross');
            $('.pagination__result').addClass('hide');
        }
    })
    var $searchDrop = $('[data-js-search="drop"]');
    $searchDrop.on('click',function () {
        $(this).toggleClass('active');
        $(this).siblings('.collapsed-content').toggleClass('hide');
        return false;
    })
})