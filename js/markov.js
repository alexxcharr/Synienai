var order = 4;
var ngrams = {};
var source;
var gram;
// var sentence;

function markov() {
    source = content.split(" ");
    // console.log(source);
    for (var i = 0; i <= source.length - order; i++) { //go through text
        gram = source.slice(i, i + order).join(' '); //pull out ngrams from txt
        var next = source[i + order];
        if (!ngrams[gram]) { //when new gram appears
            ngrams[gram] = []; //the value for the key of the object is arr
        }
        ngrams[gram].push(next); //store the next word
    }
    generate();
}

function generate() {
    //empty array for sentence, don't know why but doesnt work without it
    var sentence = new Array(10 - order);
    var beginning = []; //empty array for starting phrase
    //find ngram with the search term in key value
    for (var key in ngrams) {
        if (key.match(regex)){
            beginning.push(key); //push all posible beginning phrases
        }
    }
    //pick a random one to start
    var currentGram =random(beginning);
    sentence[0] = currentGram;
    for (var i = 0; i < 15 - order; i++) {
        var possibilities = ngrams[currentGram]; //look at possible outcomes
        if (!possibilities) {
            break;
            console.log('break');
        }
        var next = random(possibilities); //pick next word
        currentGram = currentGram.split(" "); //split ngram
        currentGram.shift(); //remove first word
        currentGram.push(next); //add next word
        currentGram = currentGram.join(' ');//join
        sentence.push(next); //add to result
    }
    sentence = sentence.join(' ');//join
    $('#poemDisp').append("<p> "+sentence+" </p> "); //add sen to div
    $('#poemDisp').css({ visibility: 'hidden'}); //hide sen
    goWiki(term); //go again
}
