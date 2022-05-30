// Import Array from words.js
import { wordsArray } from './data/words.js';
import 'animate.css';

// Use query selector to get the buttons
const keys = document.querySelectorAll(".keyboard-row button")

// Array of guessed words with an array of the word spilt into letters 
const guessedWords = [[]]
let word = "dairy"
let availableSpace = 1;

// Asigning the buttons to their data-key so it can be used
for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
        const letter = target.getAttribute("data-key")
        console.log(letter);

        if (letter === "enter") {
            handleSubmitWord();
            return;
        }

        updateGuessedWords(letter)
    }
}

// A function to get the current word
const getCurrentWordArray = () => {
    return guessedWords[guessedWords.length - 1]
}

// A function to update the guessed words
const updateGuessedWords = letter => {
    const currentWordArray = getCurrentWordArray()
    
    if (currentWordArray && currentWordArray.length < 5) {
        currentWordArray.push(letter)

        const availableSpaceEl = document.getElementById(String(availableSpace));
        availableSpaceEl.textContent = letter
        availableSpace++
    }
}

const handleSubmitWord = () => {
    const currentWordArray = getCurrentWordArray()

    if (currentWordArray.length !== 5) {
        alert("Word must be 5 letters long!")
        return;
    }

    const time = 200;
    currentWordArray.forEach((letter, index) => {
        setTimeout(() => {
            const tileColor = "lightgrey";

            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId)
        })
    })

    const currentWord = currentWordArray.join("")

    if (currentWord === word) {
        alert("Well Done!")
        return;
    }

    if (guessedWords.length === 6) {
        alert("Unlucky, you ran out of guesses! The word was " + word + ".")
        return;
    }

    guessedWords.push([])
}