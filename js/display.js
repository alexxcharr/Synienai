function fadeIn() {
    console.log('whattt');
    chars = $('#poemDisp:last-child').blast({
        delimiter: 'character'
    });
    $('#poemDisp').css({
        opacity: 0
    })
        .animate({ opacity: 1 });
    chars.each(function(i) {
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
    // if(chars.length > 0) { //check if array is empty
    $('#poemDisp').css({
        opacity: 1
    })
        .animate({ opacity: 0 }, 300);
    setTimeout(clean, 300);
}
