function display(){
      chars = $('#poemDisp:last-child').blast({
        delimiter: 'character'
    });
    chars.each(function(i) {
        $(this).css({
            visibility: 'visible',
            opacity: 0
        })
            .delay(i*60)
            .animate({ opacity: 1 }, 300);
    });

}
