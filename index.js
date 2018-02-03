const inquirer = require('inquirer');
const letter = require('./letter.js')
const word = require('./word.js')
const faker = require('faker');

var currentWordTemp = faker.random.word();
var currentWord = currentWordTemp.toLowerCase();
var currentWordArr = currentWord.split("");
var newWord = new word(currentWord);
var wordArr = [];
var userGuess = [];
var guessesLeft = 10;

newWord.getLetters();

inquirer.prompt([

  {
      type: "confirm",
      name: "wannaPlay",
      message: "Do you want to play a game?"
  }  
]).then(function(response){
    if(response.wannaPlay){
        newWord.printLetters();
        startGame();
    }else{
        console.log("-----------------------------");
        console.log("Fine, come back when you do!!");
        console.log("-----------------------------");
        return;
    }
});
function playAgain(){
    inquirer.prompt([

        {
            type: "confirm",
            name: "wannaPlay",
            message: "Do you want to play another game?"
        }
    ]).then(function (response) {
        if (response.wannaPlay) {
            newWord.printLetters();
            startGame();
        } else {
            console.log("-----------------------------");
            console.log("Fine, come back when you do!!");
            console.log("-----------------------------");
            return;
        }
    });
}
function promptUser(){
    inquirer.prompt([
        {
        type: "input",
        name: "letGuessed",
        message: "Guess a letter"
        }
    ]).then(function(user){
        userGuess.push(user.letGuessed.toLowerCase());
        console.log("-----------------------------------------")
        console.log("Your guesses so far: " + userGuess);
        checkAllLetters();
        if (newWord.countLettersFound() === currentWord.length){
            console.log("You Win!!")
            console.log("The secret word was: " + currentWord.toUpperCase());
            playAgain();
            resetGame();
        }else if(currentWordArr.indexOf(user.letGuessed) === -1){
            guessesLeft--;
            console.log("You have " + guessesLeft + " guesses remaining");
                if(guessesLeft > 0){
                    promptUser();
                }else{
                    console.log("Sorry, but you are out of guesses");
                    console.log("The secret word was: " + currentWord.toUpperCase());
                    playAgain();
                    resetGame();
                }  
        }else{
            console.log("You have " + guessesLeft + " guesses remaining");
            promptUser();
        }
    })
}

function checkAllLetters(){
for(var i=0;i<userGuess.length;i++){
    newWord.compareLetter(userGuess[i]);
    }
    newWord.printLetters();
}


function startGame(){
    promptUser();
}

function resetGame(){
    currentWordTemp = faker.random.word();
    currentWord = currentWordTemp.toLowerCase();
    currentWordArr = currentWord.split("");
    newWord = new word(currentWord);
    wordArr = [];
    userGuess = [];
    guessesLeft = 10;
    newWord.getLetters();
}