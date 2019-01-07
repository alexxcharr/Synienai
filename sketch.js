function setup() {
    noCanvas();
    let voice = new p5.Speech();
    voice.speak('fuck');
    userInput = select('#userinput');
    userInput.changed(startSearch); //when enter call startSearch
    //goWiki(userInput.value());


}
