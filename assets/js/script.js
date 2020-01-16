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
    var $galleryControlPrev = $('[data-js-gallery="control"] .prev');
    var $galleryControlNext = $('[data-js-gallery="control"] .next');
    var $galleryStatusCurr = $('[data-js-gallery="control"] .current');
    var $galleryStatusMax = $('[data-js-gallery="control"] .max');
    var $galleryBody = $('[data-js-gallery="body"]');
    var $galleryModal = $('[data-js-gallery="modal"]');
    var $galleryModalClose = $('[data-js-gallery="modal"] .close');
    var $galleryModalPrev = $('[data-js-gallery="modal"] .prev');
    var $galleryModalNext = $('[data-js-gallery="modal"] .next');
    var $galleryModalContent = $('[data-js-gallery="content"]');
    var $galleryBodyObject = $('[data-js-gallery="body"] .news__gallery__body__object');
    var $galleryBodyObjectContent = $('[data-js-gallery="body"] .news__gallery__body__object a');
    var $currSlide = 1;
    var $currModalSlide = 0;
    $(window).on('resize', function(){
        let $wrapSize = $galleryBody.outerWidth();
        let $cardSize = $galleryBodyObject.eq(0).outerWidth() + 10;
        let $cardCol = $galleryBodyObject.length;
        let $wrapCol = Math.ceil((($cardSize - 2.5) * $cardCol) / $wrapSize);
        $galleryStatusMax.text($wrapCol);
    });
    $galleryControlPrev.on('click',function () {
        if($breakingStatus){
            fBreaking();
            fSlideGalery('prev');
        }
        return false;
    })
    $galleryControlNext.on('click',function () {
        if($breakingStatus){
            fBreaking();
            fSlideGalery('next');
        }
        return false;
    })
    function fSlideGalery($direction) {
        if($direction == 'prev'){
            $currSlide--;
            if($currSlide < 1){
                $currSlide = 1;
                $galleryBodyObject.eq(0).css('marginLeft','0px');
                $galleryStatusCurr.text($currSlide);
            } else if($currSlide == 1) {
                $galleryBodyObject.eq(0).css('marginLeft','0px');
                $galleryStatusCurr.text($currSlide);
            } else {
                $galleryBodyObject.eq(0).css('marginLeft', '-' + ($currSlide - 1) * ($galleryBody.outerWidth() + 10) + 'px');
                $galleryStatusCurr.text($currSlide);
            }
        } else if ($direction == 'next'){
            $currSlide++;
            if($currSlide > +$galleryStatusMax.text()){
                $currSlide = +$galleryStatusMax.text();
                $galleryBodyObject.eq(0).css('marginLeft', '-' +  ($currSlide - 1) * ($galleryBody.outerWidth() + 10) + 'px');
                $galleryStatusCurr.text($currSlide);
            } else if($currSlide == +$galleryStatusMax.text()) {
                $galleryBodyObject.eq(0).css('marginLeft', '-' +  ($currSlide - 1)  * ($galleryBody.outerWidth() + 10) + 'px');
                $galleryStatusCurr.text($currSlide);
            } else {
                $galleryBodyObject.eq(0).css('marginLeft', '-' +  ($currSlide - 1) * ($galleryBody.outerWidth() + 10) + 'px');
                $galleryStatusCurr.text($currSlide);
            }
        }
    }
    $galleryBodyObjectContent.on('click',function () {
        $currModalSlide = $galleryBodyObjectContent.index($(this));
        $galleryModal.addClass('show');
        $('body').addClass('modal-show');
        $galleryModalContent.html("<img alt='img' src='" + $(this).attr('href') + "'>");
        return false;
    })
    $galleryModalClose.on('click',function () {
        $galleryModal.removeClass('show');
        $('body').removeClass('modal-show');
        $galleryModalContent.children().detach();
        return false;
    })
    $(document).keyup(function(e) {
        if(e.key === "Escape") {
            $galleryModal.removeClass('show');
            $('body').removeClass('modal-show');
            $galleryModalContent.children().detach();
        }
    });
    $galleryModalPrev.on('click',function () {
        if($breakingStatus){
            fBreaking();
            fModalSlideUp('prev');
        }
        return false;
    })
    $galleryModalNext.on('click',function () {
        if($breakingStatus){
            fBreaking();
            fModalSlideUp('next');
        }
        return false;
    })
    function fModalSlideUp($direction) {
        if($direction == 'prev'){
            $currModalSlide--;
            if($currModalSlide < 0){
                $currModalSlide = $galleryBodyObjectContent.length - 1;
            }
            $galleryModalContent.html("<img alt='img' src='" + $galleryBodyObjectContent.eq($currModalSlide).attr('href') + "'>" + $galleryModalContent.html())
            $galleryModalContent.children().eq(0).css({'margin-left':'-100%'});
            $galleryModalContent.children().eq(0).animate({'margin-left':'0'},500,function(){
                $galleryModalContent.children().eq(0);
                $galleryModalContent.html("<img alt='img' src='" + $galleryBodyObjectContent.eq($currModalSlide).attr('href') + "'>");
            });
        } else if($direction == 'next'){
            $currModalSlide++;
            if($currModalSlide > $galleryBodyObjectContent.length - 1){
                $currModalSlide = 0;
            }
            $galleryModalContent.html($galleryModalContent.html() + "<img alt='img' src='" + $galleryBodyObjectContent.eq($currModalSlide).attr('href') + "'>")
            $galleryModalContent.children().eq(0).css({'margin-left':'0'});
            $galleryModalContent.children().eq(0).animate({'margin-left':'-100%'},500,function () {
                $galleryModalContent.children().eq(1);
                $galleryModalContent.html("<img alt='img' src='" + $galleryBodyObjectContent.eq($currModalSlide).attr('href') + "'>");
            });
        }
    }
    var $breakingStatus = true;
    function fBreaking(){
        $breakingStatus = false;
        setTimeout(() => $breakingStatus = true, 600);
    }
    var $mobilCollapse = $('[data-js-collapse="nav-bar"]');
    $mobilCollapse.on('click',function () {
        $('.header__nav').toggleClass('active');
        $('.header__wrap').toggleClass('show');
        return false;
    })
    var $mobilCollapseSearch = $('[data-js-collapse="search"]');
    $mobilCollapseSearch.on('click',function () {
        $('.header__mobil__search').toggleClass('active');
        $('.header__wrap').toggleClass('show-search');
        return false;
    })
    var $mobilCollapseNav = $('[data-js-collapse="nav"]');
    $mobilCollapseNav.on('click',function () {
        $(this).parent('.navigation ').toggleClass('active');
        return false;
    })
    var btnSwitch = $('[data-js-switch="trigger"]');
    var contentSwitch = $('[data-js-switch="target"]');
    btnSwitch.on('click',function () {
        $(this).toggleClass('active');
        contentSwitch.toggleClass('edit');
    })
    var $tableRowArea = $('[data-js-table="delete"] .mail__body__tabl__btn');
    clearTableArea();
    setTimeout(tableRowSearch, 300);
    function tableRowSearch() {
        let $tableRow = $('[data-js-table="delete"] tr:not(.hidden)');
        for(i=1;i < $tableRow.length;i++){
            let height = $tableRow.eq(i).outerHeight();
            let top = $tableRow.eq(i).position();
            createBtn(i,height,top.top);
        }
        var tableDelet = $('[data-js-tabl-close]');
        tableDelet.on('click',function () {
            let tempIndex = $(this).attr('data-js-tabl-close');
            $tableRow.eq(tempIndex).addClass('hidden');
            clearTableArea();
            tableRowSearch();
            return false;
        })

    }
    function createBtn(index,height,top) {
        $tableRowArea.append('<a href="#" style="top:' + top + 'px;height:' + (height - 1) + 'px" data-js-tabl-close="' + index + '"><i class="ico ico__close"></i></a>');
    }
    function clearTableArea() {
        $tableRowArea.empty();
    }
})