// Import Array from words.js
import { wordsArray } from './data/words.js';


// Use query selector to get the buttons
const keys = document.querySelectorAll(".keyboard-row button")

// Array of guessed words with an array of the word spilt into letters 
const guessedWords = [[]]
let word = wordsArray[Math.floor(Math.random() * (423 - 1) ) + 1].toLowerCase()
let availableSpace = 1;
let guessedWordCount = 0;

console.log(Math.floor(Math.random() * (423 - 1) ) + 1);
console.log(word);
// Asigning the buttons to their data-key so it can be used
for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
        const letter = target.getAttribute("data-key")
        console.log(letter);

        if (letter === "enter") {
            handleSubmitWord();
            return;
        } else if (letter === "del") {
            handleDeleteLetter()
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

const handleDeleteLetter = () => {
    const currentWordArray = getCurrentWordArray()
    
    if (currentWordArray.length !== 0) {
        currentWordArray.pop()
        const lastLetterEl = document.getElementById(String(availableSpace - 1))
        lastLetterEl.textContent = ""

        availableSpace--
    }
}

const getTileColor = (letter, index) => {
    if (!word.includes(letter)) {
        return "darkgrey"
    } else if (letter === word.charAt(index)){
        return "green"
    } else {
        return "orange"
    }
}

const handleSubmitWord = () => {
    const currentWordArray = getCurrentWordArray()

    if (currentWordArray.length !== 5) {
        alert("Word must be 5 letters long!")
        return;
    }

    const firstLetterId = guessedWordCount * 5 + 1;
    const time = 200;
    currentWordArray.forEach((letter, index) => {
        setTimeout(() => {
            const tileColor = getTileColor(letter, index);

            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX");
            letterEl.style = `background-color:${tileColor};`;
        }, time * index);
    })
    guessedWordCount++

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

