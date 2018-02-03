var Letter = function(letter){
    this.letter = letter;
    this.appear = false;

    this.showLetter = function() {
        if(this.appear === false){
            return '_';
        }else{
            return this.letter;
        }
    }
}

module.exports = Letter;