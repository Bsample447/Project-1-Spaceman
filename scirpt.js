const words = ["apple", "banana", "orange", "strawberry", "grape"];
let selectedWord = "";
let guessedLetters = [];
let wrongGuessCount = 0;
const maxWrongGuessCount = 5;

function startGame() {
  // Reset variables
  guessedLetters = [];
  wrongGuessCount = 0;

  // Select a random word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // Create blank spaces for the word
  let wordContainer = document.getElementById("word");
  wordContainer.textContent = "";

  for (let i = 0; i < selectedWord.length; i++) {
    let letterSpan = document.createElement("span");
    letterSpan.textContent = "_";
    wordContainer.appendChild(letterSpan);
  }

  // Clear input and result
  document.getElementById("guess").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("wrong-guess-count").textContent = maxWrongGuessCount;
}

function displayMessage(message) {
  let messageContainer = document.getElementById("message");
  messageContainer.textContent = message;
}

function guessLetter() {
  let guessInput = document.getElementById("guess");
  let guess = guessInput.value.toLowerCase();

  if (guess.length !== 1) {
    displayMessage("Please enter a single letter!");
    return;
  }

  if (guessedLetters.includes(guess)) {
    displayMessage("You already guessed that letter!");
    return;
  }

  guessedLetters.push(guess);

  let wordContainer = document.getElementById("word");
  let letters = wordContainer.getElementsByTagName("span");

  let correctGuess = false;

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guess) {
      letters[i].textContent = guess;
      correctGuess = true;
    }
  }

  if (!correctGuess) {
    wrongGuessCount++;
    document.getElementById("wrong-guess-count").textContent = maxWrongGuessCount - wrongGuessCount;

    if (wrongGuessCount >= maxWrongGuessCount) {
      displayMessage("Game Over! You exceeded the maximum number of wrong guesses.");
      document.getElementById("submit").disabled = true;
    } else {
      displayMessage("Wrong guess. Try again!");
    }
  }

  if (checkWin()) {
    displayMessage("Congratulations! You guessed the word!");
    document.getElementById("submit").disabled = true;
  }

  guessInput.value = "";
}

function checkWin() {
  let wordContainer = document.getElementById("word");
  let letters = wordContainer.getElementsByTagName("span");

  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent === "_") {
      return false;
    }
  }

  return true;
}

document.getElementById("submit").addEventListener("click", guessLetter);

startGame();
