var searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
var contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
var content;
var userInput;
var counter = 0;
var poem;

function startSearch() {
        counter = 0;
        term = userInput.value();
        goWiki(userInput.value()); //call goWiki give input
        //let url = searchUrl + term;
        //loadJSON(url, gotSearch, 'jsonp');
    }

    //if i want to go deeper
    function goWiki(term) {
        counter = counter + 1;
        if (counter < 10) {
            let term = userInput.value();
            let url = searchUrl + term; //dynamicly change url based on input
            loadJSON(url, gotSearch, 'jsonp'); //when loaded call gotSearch
        }
    }

    function gotSearch(data) {
        console.log(data); //json file includes at most 10 title of text n urls
        let len = data[1].length; //how many articles
        let index = floor(random(len)); //pick random article
        let title = data[1][index];
        title = title.replace(/\s+/g, '_'); //replace spaces in title with _
        //createDiv(title); //show title prob dont need it
        console.log('Querying: ' + title);
        let url = contentUrl + title; //dynamicly change content url
        //console.log(url);
        loadJSON(url, gotContent, 'jsonp'); //when loaded call gotContent
    }

    function gotContent(data) {
        let page = data.query.pages; //get to page id
        let pageId = Object.keys(data.query.pages)[0]; //obj.keys returns array of a given object's own roperty names
        console.log(pageId);
        content = page[pageId].revisions[0]['*'];
        content = content.replace(/[@#\$%&\*\(\)\+\|\}\{<>=\/\[\]]/g," "); //replace anything not word char w space
        content = content.replace(/\s\s+/g," ");//replace extre whitespece
       // console.log(content);
        let wordRegex = /\b\w{4,}\b/g; //word with more than 4 char
        let words = content.match(wordRegex); //find that word in content
        let word = random(words); //pick random
        let rm = new RiMarkov(3);
        rm.loadText(content);
        let sen =rm.generateSentence();
        console.log(typeof sen);
        $('#poemDisp').append("<p class =\"sen\"> "+sen+" </p> ");
       //   document.getElementById("poemDisp").appendChild(poem);
        //poem = createDiv(sen);

        goWiki(word); //call go wiki with that word
        console.log(word);
    }
