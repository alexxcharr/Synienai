var searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
var contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
var content;
var userInput;
var counter;
var poem;
var limit = 6;
var term;
var cc = 0;
var sen;
var chars = [];
var curChar;

function startSearch() {
    if(cc > 0) {
        fadeOut();
    }
    counter = 0;
    term = userInput.value();
    goWiki(userInput.value()); //call goWiki give input
    cc = cc + 1;
    $('.pixel-spinner *').css({ visibility: 'visible'});
    //let url = searchUrl + term;
    //loadJSON(url, gotSearch, 'jsonp');
    //     $('#poemDisp').empty();
}

function goWiki(term) {
    counter = counter + 1;
    console.log(counter);
    if (counter < limit) {
        // term = userInput.value();
        let url = searchUrl + term; //dynamicly change url based on input
        loadJSON(url, gotSearch, 'jsonp'); //when loaded call gotSearch
    }
    if (counter == limit) {
        $('.pixel-spinner *').css({ visibility: 'hidden'});
        fadeIn();
    }
}

function gotSearch(data) {
    try {
        console.log(data); //json file includes at most 10 title of text n urls
        let len = data[1].length; //how many articles
        if (data[1].length == 0) {
            term = 'undefined';
            goWiki(term);
            // fadeIn();
            // counter = limit;
        }
        let index = floor(random(len)); //pick random article
        let title = data[1][index];
        title = title.replace(/\s+/g, '_'); //replace spaces in title with _
        //createDiv(title); //show title prob dont need it
        console.log('Querying: ' + title);
        let url = contentUrl + title; //dynamicly change content url
        //console.log(url);
        loadJSON(url, gotContent, 'jsonp'); //when loaded call gotContent

    }catch(err){ //error handling
        // console.log('error');
        // $('#poemDisp').append("<p class =\"sen\">error </p> ");
        // fadeIn();
        goWiki(term);
    }
}

function gotContent(data) {
    try{
        let page = data.query.pages; //get to page id
        let pageId = Object.keys(data.query.pages)[0]; //obj.keys returns array of a given object's own roperty names
        console.log(pageId);
        content = page[pageId].revisions[0]['*'];
        content = content.replace(/[@#\$%&\*\(\)\+\|\_\}\{<>=\/\[\]]/g," "); //replace symbols with w space
        content = content.replace(/\s\s+/g," ");//replace extra whitespece
        // console.log(content);
        let wordRegex = /\b\w{4,}\b/g; //word with more than 4 char
        let words = content.match(wordRegex); //find that word in content
        let word = random(words); //pick random
        let rm = new RiMarkov(3);
        rm.loadText(content);
        sen =rm.generateSentence(6);
        console.log(typeof sen);
        $('#poemDisp').append("<p class =\"sen\"> "+sen+" </p> ");
        $('#poemDisp').css({ visibility: 'hidden'});
        term = word;
        goWiki(term); //call go wiki with that word
        console.log(word);
    }catch(err){
        goWiki(term);
    }
}
