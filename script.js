const words = ["rocket", "warp", "nebula", "asteroid", "ship"]; // Array of words to start from
let selectedWord = ""; // Selected word to guess
let guessedLetters = []; // Array of guessed letters
let wrongGuessCount = 0; // Number of wrong guesses
const maxWrongGuessCount = 5; // Maximum number of wrong guesses allowed




function startGame() {  // Function to start the game
  // Reset variables
  guessedLetters = [];
  wrongGuessCount = 0;

  // Select a random word
  selectedWord = words[Math.floor(Math.random() * words.length)];  // Select a random word from the array

  // Create blank spaces for the word
  let wordContainer = document.getElementById("word");        // Get the word container element
  wordContainer.textContent = "";                             // Clear the word container

  for (let i = 0; i < selectedWord.length; i++) {             // Loop through each letter in the selected word
    let letterSpan = document.createElement("span");          // Create a new span element
    letterSpan.textContent = "_";                             // Set the text content of the span to "_"
    wordContainer.appendChild(letterSpan);                    // Add the span to the word container
  }

  // Clear input and result
  document.getElementById("guess").value = "";                // Clear the input field
  document.getElementById("result").textContent = "";         // Clear the result container
  document.getElementById("wrong-guess-count").textContent = maxWrongGuessCount;  // Update the number of wrong guesses
}

function displayMessage(message) {                            // Function to display a message
  let messageContainer = document.getElementById("message");  // Get the message container element
  messageContainer.textContent = message;                     // Set the text content of the message container
}

function guessLetter() {                                      // Function to handle a guess
  let guessInput = document.getElementById("guess");          // Get the guess input field
  let guess = guessInput.value.toLowerCase();                 // Get the guessed letter

  if (guess.length !== 1) {                                   // If the guess is not a single letter
    displayMessage("Please enter a single letter!");          // Display an error message, because that's just not how this works I tell ya
    return;
  }

  if (guessedLetters.includes(guess)) {                       // If the guessed letter has already been guessed
    displayMessage("You already guessed that letter!");       // Display an error message, because they already guessed that letter, those silly goose players
    return;
  }

  guessedLetters.push(guess);                                 // Add the guessed letter to the array of guessed letters

  let wordContainer = document.getElementById("word");        // Get the word container element
  let letters = wordContainer.getElementsByTagName("span");   // Get all the letter spans in the word container

  let correctGuess = false;                                   // Flag to indicate if the guessed letter is in the selected word

  for (let i = 0; i < selectedWord.length; i++) {             // Loop through each letter in the selected word
    if (selectedWord[i] === guess) {                          // If the guessed letter matches the current letter in the selected word
      letters[i].textContent = guess;                         // Set the text content of the current letter span to the guessed letter
      correctGuess = true;                                    // Set the correct guess flag to true, woohoo they guessed right!
    }
  }

  if (!correctGuess) {                                        // If the guessed letter was not in the selected word
    wrongGuessCount++;                                        // Increment the number of wrong guesses, oh well, they guessed wrong.
    document.getElementById("wrong-guess-count").textContent = maxWrongGuessCount - wrongGuessCount;  // Update the number of wrong guesses

    if (wrongGuessCount >= maxWrongGuessCount) {              // If the maximum number of wrong guesses has been reached
      displayMessage("Game Over! You exceeded the maximum number of wrong guesses.");  // Display a game over message
      document.body.style.backgroundImage = 'url("images/game-over.jpg")';             // Set the background image to the game over image
      document.body.style.backgroundSize = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";

      document.getElementById("submit").disabled = true;                               // Disable the submit button
    } else {
      displayMessage("Wrong guess. Try again!");                                       // Display a wrong guess message if they have not gone over guesses.
    }
  }

  if (checkWin()) {                                               // If the player has won
    document.body.style.backgroundImage = 'url("images/game-win.jpg")';  // Set the background image to the game win image
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center center";
    displayMessage("Congratulations! You guessed the word!");     // Display a congratulations message
    document.getElementById("submit").disabled = true;            // Disable the submit button
  }

  guessInput.value = "";                                          // Clear the guess input field
}

function checkWin() {                                            // Function to check if the player has won
  let wordContainer = document.getElementById("word");           // Get the word container element
  let letters = wordContainer.getElementsByTagName("span");      // Get all the letter spans in the word container
  for (let i = 0; i < letters.length; i++) {                     // Loop through each letter span in the word container
    if (letters[i].textContent === "_") {                        // If the current letter span is empty
      return false;                                              // Return false, because the player has not won yet
    }
  }
  if (document.body.style.backgroundImage !== 'url("images/game-win.jpg")') {  // If the background image is not the game win image
    document.body.style.backgroundImage = 'url("images/game-win.jpg")';        // Set the background image to the game win image
    document.getElementById("submit").disabled = true;                         // Disable the submit button
    displayMessage("Congratulations! You guessed the word!");                 // Display a congratulations message
  }
  return true;                                                      // Return true, because the player has won!
}

document.getElementById("submit").addEventListener("click", guessLetter);    // Add a click event listener to the submit button


startGame();                                                      // Call the startGame function to start the game.