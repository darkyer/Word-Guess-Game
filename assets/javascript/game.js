
// Number of wins, lose
var win = 0;
var lose = 0;

// Possible words array
var possibleWords = ["alligator", "ant", "bear", "bee", "bird", "camel", "cat", "cheetah", "chicken", "chimpanzee", "cow", "crocodile",
    "deer", "dog", "dolphin", "duck", "eagle", "elephant", "fish", "fly", "fox", "frog", "giraffe", "goat", "goldfish", "hamster", "hippopotamus",
    "horse", "kangaroo", "kitten", "lion", "lobster", "monkey", "octopus", "owl", "panda", "pig", "puppy", "rabbit", "rat", "scorpion", "seal", "shark",
    "sheep", "snail", "snake", "spider", "squirrel", "tiger", "turtle", "wolf", "zebra"]

var guessesLeft = 9;
var currentguessesLeft = guessesLeft;
var shouldCalculateNewWord = true;
var currentGuesses = "";
var userGuess;
var wordToGuess;
var currentGuessed = "";

// we get the html tags in some variables
var winText = document.getElementById("win-text");
var loseText = document.getElementById("lose-text");
var wordToGuessText = document.getElementById("word-to-guess");
var guessesLeftText = document.getElementById("remaining-guesses");
var guessedLettersText = document.getElementById("guessed-letters");
var repeatedLetterText = document.getElementById("repeated-letter-error");

// HACK FOR TESTING
// var computerText = document.getElementById("hack")

//we set the current guesses left text to its default value
guessesLeftText.textContent = currentguessesLeft;

GenerateNewWord();

function GenerateNewWord() {
    if (shouldCalculateNewWord) {
        wordToGuess = possibleWords[Math.floor(Math.random() * possibleWords.length)].toString();
        // computerText.textContent = wordToGuess; //HACK FOR TESTING
        DashGenerator(wordToGuess);
        shouldCalculateNewWord = false;
        console.log("Clever to see the console, here is the answer: " + wordToGuess);
    }
}


function Reset() {
    currentGuessed = "";

    // Reset current guesses left and text
    currentguessesLeft = guessesLeft;
    guessesLeftText.textContent = currentguessesLeft;

    // Reset already guessed letters and text
    currentGuesses = "";
    guessedLettersText.textContent = "_";

    // Change booleant to generate a new word in the next keypress
    shouldCalculateNewWord = true;
    GenerateNewWord();
}

function DashGenerator(word) {
    wordToGuessText.textContent = "";
    for (var i = 0; i < word.length; i++) {
        wordToGuessText.textContent += "_";
        currentGuessed += "_";
    }
}

function UpdateDashWord(index, letter) {
    currentGuessed = currentGuessed.substring(0, index) + letter + currentGuessed.substring(index + 1);
    wordToGuessText.textContent = currentGuessed;
}

function CheckGameStatus() {
    if (currentGuessed == wordToGuess) {
        wordToGuessText.textContent = wordToGuess;
        win++;
        UpdateScore();
        setTimeout(Reset,1000);
    }

    if (currentguessesLeft == 0) {
        lose++;
        UpdateScore();
        setTimeout(Reset,1000);
    }
}


function UpdateScore() {
    winText.textContent = win;
    loseText.textContent = lose;
}

function CheckLetter(letter) {
    var count = 0;
    for (var i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess.charAt(i) == letter) {
            UpdateDashWord(i, letter);
            count++;
        }
    }

    if (count == 0) {
        currentguessesLeft--;
        guessesLeftText.textContent = currentguessesLeft;
    }
}

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {

    if (!event.key.match(/[a-z]/i) || event.key.length > 1) {
        return;
    }

    if (currentGuesses.includes(event.key)) {
        repeatedLetterText.style.visibility = "visible";
        setInterval(() => {
            repeatedLetterText.style.visibility = "hidden";
        }, 3000);
        return;
    }

    userGuess = event.key;
    // Calculate a new word if needed
    GenerateNewWord();

    // Determines which key was pressed and add it to the current guessed letters

    currentGuesses += userGuess + ", ";
    guessedLettersText.textContent = currentGuesses;

    CheckLetter(userGuess);
    CheckGameStatus();
};