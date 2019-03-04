
// Number of wins, lose
var win = 0;
var lose = 0;

// Possible words array
var possibleWords = ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou",
    "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing",
    "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves",
    "embezzle", "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove",
    "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip",
    "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest",
    "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole",
    "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz",
    "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo",
    "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes",
    "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength",
    "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress",
    "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex",
    "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard",
    "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch",
    "zipper", "zodiac", "zombie", "View all"]

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
    currentGuessed = currentGuessed.substring(0,index) + letter + currentGuessed.substring(index+1);
    wordToGuessText.textContent = currentGuessed;
}

function CheckGameStatus() {
    if (currentGuessed == wordToGuess) {
        win++;
        UpdateScore();
        Reset();
    }

    if(currentguessesLeft == 0){
        lose++;
        UpdateScore();
        Reset();
    }
}

function UpdateScore(){
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

    if(count == 0){
        currentguessesLeft--;
        guessesLeftText.textContent = currentguessesLeft;
    }
}

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {

    // Calculate a new word if needed
    GenerateNewWord();

    // Determines which key was pressed and add it to the current guessed letters
    userGuess = event.key;
    currentGuesses += userGuess + ", ";
    guessedLettersText.textContent = currentGuesses;

    CheckLetter(userGuess);
    CheckGameStatus(); 
};