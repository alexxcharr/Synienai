var searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
var contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
var content;
var userInput;
var counter;
var limit = 5;
var term;
var cc = 0;
var chars = [];
var curChar;
var regex;

function startSearch() {
    //if its now the first search fade out text
    if(cc > 0) {
        fadeOut();
    }
    counter = 0; //counter for number of senetnces to be produced
    term = userInput.value(); //take value from search
    goWiki(userInput.value()); //call goWiki give input
    cc = cc + 1;
    $('.pixel-spinner *').css({ visibility: 'visible'}); //loading
}

function goWiki(term) {
    if (counter < limit) {
        let url = searchUrl + term; //dynamicly change url based on input
        loadJSON(url, gotSearch, 'jsonp'); //when loaded call gotSearch
    }
    //if counter hits limit fade in text
    if (counter == limit) {
        $('.pixel-spinner *').css({ visibility: 'hidden'});
        fadeIn();
    }
    counter++;
}

function gotSearch(data) {
    try {
        // console.log(data);
        // data is the json file including at most 10 title of text n urls
        //if there are no articles search undefined
        if (data[1].length == 0) {
            term = 'undefined';
            goWiki(term);
        }
        //check that the users input is being searched and not just part of it
        //find term either with upper or lower case letters
        regex = new RegExp('\\b'+term+'\\b', 'i');
        console.log(regex);
        let arr = [];
        for (var i = 0; i <= data[1].length; i++) {
            if (regex.test(data[1][i])) { //if regex matches with article title
                arr.push(i); //store index
            }
        }
        var index = random(arr); //pick random article
        let title = data[1][index];
        title = title.replace(/\s+/g, '_'); //replace spaces in title with _
        console.log('Querying: ' + title);
        let url = contentUrl + title; //dynamicly change content url
        loadJSON(url, gotContent, 'jsonp'); //when json loaded call gotContent

    }catch(err){ //error handling
        goWiki(term);
    }
}

function gotContent(data) {
    try{
        let page = data.query.pages; //get to page id
        //obj.keys returns array of a given object's own property names
        let pageId = Object.keys(data.query.pages)[0];
        console.log(pageId);
        content = page[pageId].revisions[0]['*'];
        //replace symbols with w space
        content = content.replace(/[@#\$%&\*\(\)\+\-\|\_\}\{<>=\/\[\]]/g," ");
        content = content.replace(/\s\s+/g," "); //replace extra whitespece
        markov();
    }catch(err){
        goWiki(term);
    }
}
