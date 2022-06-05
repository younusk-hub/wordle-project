// Use query selector to get the buttons
const buttons = document.querySelectorAll("button")
const reset = document.getElementById("restart")

// Array of guessed expressions with an array of the expression spilt into numOrOps 
const operatorArr = ["+", "-", "X"]
let guessedExpressions = [[]]
let expression = `${Math.floor(Math.random() * 9)+ 1}${operatorArr[Math.floor(Math.random()*3)]}${Math.floor(Math.random() * 9)+ 1}${operatorArr[Math.floor(Math.random()*3)]}${Math.floor(Math.random() * 9)+ 1}`
let availableSpace = 1;
let guessedExpressionCount = 0;
console.log(expression);

const displayGameTarget = () => {
    const expressionArray = expression.split("")
    console.log(expressionArray);

    for (let i = 0; i < expressionArray.length; i++) {
        if (expressionArray[i] === "X") {
            let tempAnswer = (parseInt(expressionArray[i - 1]) * parseInt(expressionArray[i + 1]));
            console.log(tempAnswer);
            expressionArray.splice((i-1), 3, tempAnswer);
            console.log(expressionArray);
            i--;
        };
    };

    for (let i = 0; i < expressionArray.length; i++) {
        if (expressionArray[i] === "+") {
            let tempAnswer = (parseInt(expressionArray[i - 1]) + parseInt(expressionArray[i + 1]));
            console.log(tempAnswer);
            expressionArray.splice((i-1), 3, tempAnswer);
            console.log(expressionArray);
            i--;
        };
    };

    for (let i = 0; i < expressionArray.length; i++) {
        if (i !== 0 && expressionArray[i] === "-") {
            console.log(i)
            let tempAnswer = (parseInt(expressionArray[i - 1]) - parseInt(expressionArray[i + 1]));
            console.log(tempAnswer);
            expressionArray.splice((i-1), 3, tempAnswer);
            console.log(expressionArray);
            i--;
        }
    };

    document.querySelector(".heading__target").textContent = `The target is: ${expressionArray}`

}

displayGameTarget()
// Asigning the buttons to their data-key so it can be used
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = ({target}) => {
        const numOrOp = target.getAttribute("data-key")
        console.log(numOrOp);
        
        if (numOrOp === "enter") {
            handleSubmitexpression();
            return;

        } else if (numOrOp === "del") {
            const currentExpressionArray = guessedExpressions[guessedExpressions.length - 1]
    
            if (currentExpressionArray.length !== 0) {
                currentExpressionArray.pop()
                const lastnumOrOpElement = document.getElementById(String(availableSpace - 1))
                lastnumOrOpElement.textContent = ""

                availableSpace--
            }
            return;
        }
        updateGuessedexpressions(numOrOp);
    }
}

// A function to update the guessed expressions
const updateGuessedexpressions = numOrOp => {
    const currentExpressionArray = guessedExpressions[guessedExpressions.length - 1]
    
    if (currentExpressionArray.length < 5) {
        currentExpressionArray.push(numOrOp)

        const availableSpaceElement = document.getElementById(String(availableSpace));
        availableSpaceElement.textContent = numOrOp
        availableSpace++
    }
}

const getTileColor = (numOrOp, index) => {
    // if (!expression.includes(numOrOp)) {
    //     return "#2B2B2B"
    // } else if (numOrOp === expression.charAt(index)){
    //     return "green"
    // } else {
    //     return "orange"
    // }

    if (numOrOp === expression.charAt(index)) {
        return "green"
    } else {
        return "#2B2B2B"
    }
}

const handleSubmitexpression = () => {
    const currentExpressionArray = guessedExpressions[guessedExpressions.length - 1]

    if (currentExpressionArray.length !== 5) {
        alert("expression must be 5 numOrOps long!")
        return;
    }

    const firstnumOrOpId = guessedExpressionCount * 5 + 1;
    const time = 200;
    currentExpressionArray.forEach((numOrOp, index) => {
        console.log(numOrOp);
        setTimeout(() => {
            const tileColor = getTileColor(numOrOp, index);

            const numOrOpId = firstnumOrOpId + index;
            const numOrOpElement = document.getElementById(numOrOpId);
            numOrOpElement.classList.add("animate__flipInX");
            numOrOpElement.style = `background-color:${tileColor};`;


        }, time * index);
    })
    guessedExpressionCount++

    const currentExpression = currentExpressionArray.join("")
    if (currentExpression === expression) {
        
        guessedExpressions.push([])
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

    if (guessedExpressions.length === 6) {
        alert("Unlucky, you ran out of guesses! The expression was " + expression + ".")
        guessedExpressions.push([])
        return;
    }

    guessedExpressions.push([])
}

const resetGame = () => {
    guessedExpressions = [[]]
    expression = `${Math.floor(Math.random() * 9)+ 1}${operatorArr[Math.floor(Math.random()*3)]}${Math.floor(Math.random() * 9)+ 1}${operatorArr[Math.floor(Math.random()*3)]}${Math.floor(Math.random() * 9)+ 1}`
    availableSpace = 1;
    guessedExpressionCount = 0;
    displayGameTarget()

    for (let i = 1; i < 31; i++) {
        const clearSquares = document.getElementById(i)
        clearSquares.innerText = ""
        clearSquares.style = `background-color: #373436;` 
        clearSquares.classList.remove("animate__flipInX")
    }

}

reset.addEventListener("click", resetGame)