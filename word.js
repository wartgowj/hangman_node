var Letter = require('./letter.js');

function Word(word){
    this.word = word;
    this.letters = [];
    this.wordFound = false;
}

Word.prototype.getLetters = function(){
    for(var i = 0; i<this.word.length;i++){
        var newLet = new Letter(this.word[i]);
        this.letters.push(newLet);
    }
}

Word.prototype.compareLetter = function(userGuess){
    for(var i = 0; i<this.letters.length; i++){
        if(userGuess === this.letters[i].letter){
            this.letters[i].appear = true;
        }
    }
}

Word.prototype.countLettersFound = function(){
    let found = 0;
    for(var i = 0; i<this.letters.length; i++){
        if(this.letters[i].appear){
            found++;
        }
    }
    return found;
}

Word.prototype.printLetters = function(){
    var wordArr =[];
    for (var i = 0; i < this.letters.length; i++) {
        wordArr.push(this.letters[i].showLetter());
    }
    console.log(wordArr.join(' '));
}

module.exports = Word