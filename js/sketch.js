function setup() {
    noCanvas();
    userInput = select('#userinput');
    userInput.changed(startSearch); //when enter call startSearch
}
