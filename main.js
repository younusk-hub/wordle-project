// Import Array from words.js
import { wordsArray } from './data/words.js';

// Use query selector to get the buttons
const buttons = document.querySelectorAll("button")
const reset = document.getElementById("restart")

// Array of guessed words with an array of the word spilt into letters 
let guessedWords = [[]]
let word = wordsArray[Math.floor(Math.random() * (423 - 1) ) + 1].toLowerCase()
let availableSpace = 1;
let guessedWordCount = 0;
console.log(Math.floor(Math.random() * (423 - 1) ) + 1);
console.log(word);

// Asigning the buttons to their data-key so it can be used
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = ({target}) => {
        const letter = target.getAttribute("data-key")
        console.log(letter);
        
        if (letter === "enter") {
            handleSubmitWord();
            return;

        } else if (letter === "del") {
            const currentWordArray = guessedWords[guessedWords.length - 1]
    
            if (currentWordArray.length !== 0) {
                currentWordArray.pop()
                const lastLetterElement = document.getElementById(String(availableSpace - 1))
                lastLetterElement.textContent = ""

                availableSpace--
            }
            return;
        }
        updateGuessedWords(letter);
    }
}

// A function to update the guessed words
const updateGuessedWords = letter => {
    const currentWordArray = guessedWords[guessedWords.length - 1]
    
    if (currentWordArray.length < 5) {
        currentWordArray.push(letter)

        const availableSpaceElement = document.getElementById(String(availableSpace));
        availableSpaceElement.textContent = letter
        availableSpace++
    }
}

const getTileColor = (letter, index) => {
    if (!word.includes(letter)) {
        return "#2B2B2B"
    } else if (letter === word.charAt(index)){
        return "green"
    } else {
        return "orange"
    }
}

const handleSubmitWord = () => {
    const currentWordArray = guessedWords[guessedWords.length - 1]

    if (currentWordArray.length !== 5) {
        alert("Word must be 5 letters long!")
        return;
    }

    const firstLetterId = guessedWordCount * 5 + 1;
    const time = 200;
    currentWordArray.forEach((letter, index) => {
        console.log(letter);
        setTimeout(() => {
            const tileColor = getTileColor(letter, index);

            const letterId = firstLetterId + index;
            const letterElement = document.getElementById(letterId);
            letterElement.classList.add("animate__flipInX");
            letterElement.style = `background-color:${tileColor};`;

            buttons.forEach(button => {
                if (button.innerText.toLowerCase() === letter) {
                    button.style = `background-color:${tileColor};`
                }
            })
        }, time * index);
    })
    guessedWordCount++

    const currentWord = currentWordArray.join("")
    if (currentWord === word) {
        
        guessedWords.push([])
        confetti({
            particleCount: 200,
            angle: 60,
            spread: 100,
            velocity: 100,
            origin: { x: 0 }
          });
        confetti({
            particleCount: 200,
            angle: 120,
            spread: 100,
            velocity: 100,
            origin: { x: 1 }
        });
        return;
    }

    if (guessedWords.length === 6) {
        alert("Unlucky, you ran out of guesses! The word was " + word + ".")
        guessedWords.push([])
        return;
    }

    guessedWords.push([])
}

const resetGame = () => {
    guessedWords = [[]]
    word = wordsArray[Math.floor(Math.random() * (423 - 1) ) + 1].toLowerCase()
    availableSpace = 1;
    guessedWordCount = 0;
    console.log(Math.floor(Math.random() * (423 - 1) ) + 1);
    console.log(word);

    buttons.forEach(button => {
        button.style = `background-color: #949090;`
    })

    for (let i = 1; i < 31; i++) {
        const clearSquares = document.getElementById(i)
        clearSquares.innerText = ""
        clearSquares.style = `background-color: #373436;` 
        clearSquares.classList.remove("animate__flipInX")
    }

}

reset.addEventListener("click", resetGame)