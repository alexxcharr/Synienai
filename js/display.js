function fadeIn() {
    //blast seperates every character
    chars = $('#poemDisp').blast({
        delimiter: 'character'
    });
    $('#poemDisp').css({
        opacity: 0
    })
        .animate({ opacity: 1 });
    chars.each(function(i) {
        //fade in each character
        $(this).css({
            visibility: 'visible',
            opacity: 0
        })
            .delay(i*60)
            .animate({ opacity: 1 }, 300);
    });

}

function clean() {
    $('#poemDisp').empty();
}

function fadeOut() {
    //fade it all out
    $('#poemDisp').css({
        opacity: 1
    })
        .animate({ opacity: 0 }, 300);
    setTimeout(clean, 300);
}
