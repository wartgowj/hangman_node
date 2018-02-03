const inquirer = require('inquirer');
const letter = require('./letter.js')
const word = require('./word.js')

var currentWord = "testing";

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
        startGame();
    }else{
        console.log("-----------------------------");
        console.log("Fine, come back when you do!!");
        console.log("-----------------------------");
        return;
    }
});

function promptUser(){
    inquirer.prompt([
        {
        type: "input",
        name: "letGuessed",
        message: "Pick a letter to guess"
        }
    ]).then(function(user){
        userGuess.push(user.letGuessed);
        checkAllLetters();
        if (newWord.countLettersFound() === currentWord.length){
            console.log("You Win!!")
        }else{
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