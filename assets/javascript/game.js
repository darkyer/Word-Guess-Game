
        // number of wins, lose, tie
        var win = 0;
        var lose = 0;
        var tie = 0;
        var possibleGuesses = "abcdefghijklmnopqrstuvwxyz";
        var guessesLeft = 9;
        var currentguessesLeft = guessesLeft;
        var shouldCalculateNewLetter = true;


        // we get the html tags in some variables
        var winText = document.getElementById("winsText");
        var loseText = document.getElementById("loosesText");

        var computerText = document.getElementById("computer")
        var userText = document.getElementById("GuessesText")
        var guessesLeftText = document.getElementById("guessesLeftText");
        guessesLeftText.textContent = currentguessesLeft;

        function Reset() {
            currentguessesLeft = guessesLeft;
            currentGuesses = "";
            GuessesText.textContent = "";
            shouldCalculateNewLetter = true;
            guessesLeftText.textContent = currentguessesLeft;
        }
        var currentGuesses = "";
        var computerGuess;
        var userGuess;
        // This function is run whenever the user presses a key.
        document.onkeyup = function (event) {

            // Determines which key was pressed.
            userGuess = event.key;
            if (shouldCalculateNewLetter) {
                computerGuess = possibleGuesses.charAt(Math.floor(Math.random() * possibleGuesses.length));
                computerText.textContent = computerGuess;
                shouldCalculateNewLetter = false;
            }

            userText.textContent = userGuess;
            currentGuesses += userGuess + ", " ;
            if (userGuess == computerGuess) {
                win++;
                Reset();
            }
            else {
                currentguessesLeft--;
                userText.textContent = currentGuesses;
                if (currentguessesLeft == 0) {
                    lose++;
                    Reset();
                }
            }

            winText.textContent = win;
            loseText.textContent = lose;
            guessesLeftText.textContent = currentguessesLeft;

            // Randomly chooses a choice from the options array. This is the Computer's guess.
        };