$(document).ready(function () {
    activeTab(1)
    function activeTab(tabNumber) {
        let controlLeft = $('[data-js-bs-tabs="'+ tabNumber +'"] .arr__left');
        let controlRight = $('[data-js-bs-tabs="'+ tabNumber +'"] .arr__right');
        let slides = $('[data-js-bs-tabs="'+ tabNumber +'"] .business-cards__content__slider__item');
        let currSlide = 1;
        let capSlide = slides.length;
        controlCheck();
        function controlCheck() {
            if(currSlide > 1 && currSlide < capSlide){
                controlLeft.removeClass('disable');
                controlRight.removeClass('disable');
            } else {
                if(currSlide <= 1){
                    controlLeft.addClass('disable');
                }
                if(currSlide >= capSlide){
                    controlRight.addClass('disable');
                }
            }
        }
        controlLeft.on('click',function () {
            if(!$(this).hasClass('disable')){
                currSlide -= 1;
                slides.removeClass('active');
                slides.eq(currSlide - 1).addClass('active');
                slides.eq(0).animate({'margin-left':'-'+ 50 * (currSlide - 1) +'%'},800);
                controlCheck();

            }
            return false;
        })
        controlRight.on('click',function () {
            if(!$(this).hasClass('disable')){
                slides.removeClass('active');
                slides.eq(currSlide).addClass('active');
                slides.eq(0).animate({'margin-left':'-'+ 50 * currSlide +'%'},800);
                currSlide += 1;
                controlCheck();

            }
            return false;
        })

    }
})