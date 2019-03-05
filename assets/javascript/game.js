
var HangmanGame = {
    // Number of wins, lose
    win: 0,
    lose: 0,

    enableInput: true,
    // Possible words array
    possibleWords: ["alligator", "ant", "bear", "bee", "bird", "camel", "cat", "cheetah", "chicken", "chimpanzee", "cow", "crocodile",
        "deer", "dog", "dolphin", "duck", "eagle", "elephant", "fish", "fly", "fox", "frog", "giraffe", "goat", "goldfish", "hamster", "hippopotamus",
        "horse", "kangaroo", "kitten", "lion", "lobster", "monkey", "octopus", "owl", "panda", "pig", "puppy", "rabbit", "rat", "scorpion", "seal", "shark",
        "sheep", "snail", "snake", "spider", "squirrel", "tiger", "turtle", "wolf", "zebra"],

    currentguessesLeft: 9,
    currentGuesses: "",
    userGuess: "",
    wordToGuess: "",
    currentGuessed: "",
    audioWin: new Audio("assets/audio/win.mp3"),
    audioLose: new Audio("assets/audio/lose.mp3"),


    // we get the html tags in some variables
    winText: document.getElementById("win-text"),
    loseText: document.getElementById("lose-text"),
    wordToGuessText: document.getElementById("word-to-guess"),
    guessesLeftText: document.getElementById("remaining-guesses"),
    guessedLettersText: document.getElementById("guessed-letters"),
    repeatedLetterText: document.getElementById("repeated-letter-error"),


    // Functions
    GenerateNewWord:function () {
        this.enableInput = true;
        this.wordToGuess = this.possibleWords[Math.floor(Math.random() * this.possibleWords.length)].toString();
        this.DashGenerator(this.wordToGuess);
        this.currentguessesLeft = 9;
        console.log("Clever to see the console, here is the answer: " + this.wordToGuess);
    },
    
    
    Reset:function () {
        this.currentGuessed = "";
    
        // Reset current guesses left and text
        this.currentguessesLeft = 9;
        this.guessesLeftText= document.getElementById("remaining-guesses");
        this.guessesLeftText.textContent = currentguessesLeft;
    
        // Reset already guessed letters and text
        this.currentGuesses = "";
        this.guessedLettersText= document.getElementById("guessed-letters");
        this.guessedLettersText.textContent = "_";
        this.enableInput = true;
        HangmanGame.GenerateNewWord();
    },
    
    DashGenerator:function(word) {
        this.wordToGuessText.textContent = "";
        this.currentGuessed = "";
        for (var i = 0; i < word.length; i++) {
            this.wordToGuessText.textContent += "_";
            this.currentGuessed += "_";
        }

        this.currentGuesses = "";
    },
    
    UpdateDashWord:function (index, letter) {
        this.currentGuessed = this.currentGuessed.substring(0, index) + letter + this.currentGuessed.substring(index + 1);
        this.wordToGuessText.textContent = this.currentGuessed;
    },
    
    CheckGameStatus:function () {
        if (this.currentGuessed == this.wordToGuess) {
            this.wordToGuessText.textContent = this.wordToGuess;
            this.win++;
            this.audioWin.pause();
            this.audioWin.currentTime = 0;
            this.audioWin.play();
            HangmanGame.UpdateScore();
            this.enableInput = false;
            setTimeout(HangmanGame.Reset, 1000);
        }
    
        if (this.currentguessesLeft == 0) {
            this.lose++;
            this.audioLose.pause();
            this.audioLose.currentTime = 0;
            this.audioLose.play();
            HangmanGame.UpdateScore();
            this.enableInput = false;
            setTimeout(HangmanGame.Reset, 1000);
        }
    },
    
    
    UpdateScore:function () {
        this.winText.textContent = this.win;
        this.loseText.textContent = this.lose;
    },
    
    CheckLetter: function (letter) {
        var count = 0;
        for (var i = 0; i < this.wordToGuess.length; i++) {
            if (this.wordToGuess.charAt(i) == letter) {
                HangmanGame.UpdateDashWord(i, letter);
                count++;
            }
        }
    
        if (count == 0) {
            this.currentguessesLeft--;
            this.guessesLeftText.textContent = this.currentguessesLeft;
        }
    }
}

// Generate a new word to start the game
HangmanGame.GenerateNewWord();

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {

    if(HangmanGame.enableInput == false){
        return;
    }
    // Check for input only letters
    if (!event.key.match(/[a-z]/i) || event.key.length > 1) {
        return;
    }

    // Check if user already input that letter
    if (HangmanGame.currentGuesses.includes(event.key)) {
        // Change css of error to be visible 
        HangmanGame.repeatedLetterText.style.visibility = "visible";

        // Disable Error after 3 segs
        setInterval(() => {
            HangmanGame.repeatedLetterText.style.visibility = "hidden";
        }, 3000);
        return;
    }

    // If we passed the previous two filters we save the letter to a variable
    userGuess = event.key;

    // Determines which key was pressed and add it to the current guessed letters
    HangmanGame.currentGuesses += userGuess + ", ";
    HangmanGame.guessedLettersText.textContent = HangmanGame.currentGuesses;

    // Check status of the game
    HangmanGame.CheckLetter(userGuess);
    HangmanGame.CheckGameStatus();
};