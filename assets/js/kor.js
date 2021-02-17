

{{  РАСКРЫВАШКИ }}
$(document).ready(function () {

    $(".hiddenCat").hide();
    $(".hide_all").hide();

    $('.show_all').click(function () {
        $(this).parent("div").find(".hiddenCat").slideDown(250);
        $(this).parent('div').find('.hide_all').fadeIn();
        $(this).hide();
    });
    $(".hide_all").click(function () {
        $(this).parent("div").find(".hiddenCat").slideUp(250);
        $(this).hide();
        $(this).parent("div").find(".show_all").show();
    });


    {{  окошко фильтра }}

    $(".filterPopup").on('click',function () {

        if($("#filterPopup").hasClass('shown')) {

            $(".filter-container").removeClass('show');
            $(".filter-container").addClass('closed');
            $(".filterPopup").removeClass('shown');
            $("body").removeClass('modal-open');

        } else {

            $(".filter-container").addClass('show');
            $(".filterPopup").addClass('shown');
            $("body").addClass('modal-open');

        }

        return false;

    });


});



$(document).ready(function() {
    var listener = false;
    var elements = { 'text' : new Array(), 'hidden' : new Array(), 'checkbox' : new Array(), 'radio' : new Array() };
    var ys_timeout = false;
    mouseX = -1000;
    mouseY = -1000;

    $('body').mousemove(function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
    });
    ys_getAttrNameByTagType = function(tagType) {
        if(tagType == 'text' || tagType == 'hidden') {
            return 'value';
        } else {
            return 'checked';
        }
    }

    function ys_getQyeryString() {

        var queryString = new Array();
        for(i in elements) {
            for(j=0; j < elements[i].length; j++) {
                var elementData = elements[i][j];
                var attrName = ys_getAttrNameByTagType(i);
                if(elementData.storedValue) {
                    queryString.push(elementData.element.attr('name') + '=' + elementData.element.attr('value'));
                }
            }
        }

        var queryString  = $('form[name=search]').serialize()
        return queryString;{{ = queryString.join('&');}}
    }

    function ys_getResultCount(element) {
        {{console.log('ищу');}}
        $('#ys_button').attr('value', 'Обновляем...');
        var requestString = '<['main.system.php.scripts.search-get-counters-place']._url>?' + ys_getQyeryString();
        $.getJSON(requestString, function(json) {
            $('#ys_button').attr('value', json.string);
            $('#ys_button_nav').text(json.count);

            if(element != null) {
                var ediv = $('#ys_div');
                if(parseInt(element.offset().top, 10) != 0)
                    var top = parseInt(element.offset().top, 10) - 400;
                else
                    var top = mouseY - 400;
                {{alert(top);
                    var left = parseInt($('#ys_form').offset().left) - parseInt($('#ys_div').width()) - 15;}}
                var left = - parseInt($('#ys_div').width()) - 20;
                {{ alert(left); }}
                ediv.css({
                    'top' : top,
                    'left' : left
                }).find('#ys_div_count').text(json.count);
                ediv.fadeIn();
                if(ys_timeout) {
                    clearTimeout(ys_timeout);
                    ys_timeout = false;
                }
                ys_timeout = setTimeout(function() {
                    ediv.fadeOut();
                    $('#ys_button_nav').removeClass("an");
                }, 7000);
            }
        })
    }




    $('form[name="search"]').each(function() {
        $(this).find('input').each(function() {
            var tagName = $(this).get(0).tagName;
            var tagType = $(this).attr('type');
            var attrName = ys_getAttrNameByTagType(tagType);
            if(elements[tagType] != undefined) {
                elements[tagType].push({ 'element' : $(this), 'storedValue' : $(this).attr(attrName) });
            }
        })
    })



    ys_getResultCount(null);

    $('input').on('click',function(){
        ys_getResultCount($(this));
        $('#ys_button_nav').addClass("an");
    });

    $("#priceSlider").slider( {scale: 'logarithmic'} );
    $("#priceSlider").on("slide", function(slideEvt) {
        $("#price_start").val(slideEvt.value[0]);
        $("#price_end").val(slideEvt.value[1]);
    });

    $("#areaSlider").slider( {scale: 'logarithmic'} );
    $("#areaSlider").on("slide", function(slideEvtArea) {
        $("#area_start").val(slideEvtArea.value[0]);
        $("#area_end").val(slideEvtArea.value[1]);
    });
    $("#mintimeSlider").slider();
    $("#mintimeSlider").on("slide", function(slideEvtMintime) {
        $("#mintime_start").val(slideEvtMintime.value);
        {{$("#mintime_end").val(slideEvtMintime.value[1]); }}
    });

    $("#ceilingSlider").slider();
    $("#ceilingSlider").on("slide", function(slideEvtСeiling) {
        $("#ceiling_start").val(slideEvtСeiling.value[0]);
        $("#ceiling_end").val(slideEvtСeiling.value[1]);
    });



    var $filterChBox = $(".form-check-input");
    var $tagParent = $(".filterblock");
    $tagParent.on('click','.filterlabel',function () {
        var $chBoxElement = $(this).attr('data-label');
        var $chBoxInput =  $filterChBox.filter('[class="form-check-input"][id=' + $chBoxElement + ']');
        $chBoxInput.prop('checked',false);
        $(this).remove();
        // $('#ys_form').submit();
        ys_getResultCount($chBoxInput);
        return false;
    })


    listener = setInterval(function() {
        for(i in elements) {
            {{console.log('вывожу',i);}}
            for(j=0; j < elements[i].length; j++) {
                var elementData = elements[i][j];
                var attrName = ys_getAttrNameByTagType(i);

                if(elementData.element.attr(attrName) != elementData.storedValue) {
                    elementData.storedValue = elementData.element.attr(attrName);
                    ys_getResultCount(elementData.element);
                }
            }
        }
    }, 300);











})
$(document).ready(function () {
    let $width = window.innerWidth;
    if($width < 991) {
        $(".mobile-hidden").removeClass('show');
        $(".mobile-show").addClass('show');
    } else {
        $(".mobile-hidden").addClass('show');
        $(".mobile-show").removeClass('show');
        $(".filter-container.closed").removeClass('show');
        $("body").removeClass('modal-open');
    }
    $(window).resize(function(e) {
        let width = e.target.innerWidth
        if(width < 991) {
           $(".mobile-hidden").removeClass('show');
           $(".mobile-show").addClass('show');
        } else {
            $(".mobile-hidden").addClass('show');
            $(".mobile-show").removeClass('show');
            $(".filter-container.closed").removeClass('show');
            $("body").removeClass('modal-open');
        }
    });

})