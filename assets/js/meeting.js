$(document).ready(function () {
   var $scrollWindow = $('[data-js-scroll="window"]');
   var $scrollContent = $('[data-js-scroll="content"]');
   var $scrollTime = $('[data-js-scroll="time"]');
   var $scrollControl = $('[data-js-scroll="control"]');
   var $maxScrollValue = $scrollContent.outerWidth() - $scrollWindow.outerWidth();
   var $scrollSize = $scrollWindow.outerWidth() / ($scrollContent.outerWidth() / 100)
    $scrollControl.css('width',$scrollSize + '%');
   var $maxScrollControl = $scrollControl.parent().outerWidth() - $scrollControl.outerWidth()
    $scrollControl.on('mousedown',function () {
        $scrollControl.on('mousemove',function () {
            console.log('X=' + event.clientX + '  Y=' + event.clientY);
        })

    })
})