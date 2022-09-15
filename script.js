function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operation, a, b) {
    let result;
    switch (operation) {
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = subtract(a,b);
            break;
        case "*":
            result = multiply(a,b);
            break;
        case "/":
            result = divide(a,b);
            break;
        default:
            alert("Invalid Operation.");
            break;
    }
}

function displayValue(a) {
    if (!isNaN(a)) {
        let number_screen = document.querySelector('.display-number');
        number_screen.textContent = a;
    } else {
        let cache_screen = document.querySelector('.cache-expression');
        cache_screen.textContent = cache_screen.textContent.concat(a);
    }
}

function inputNumber(number) {
    let numberScreen = document.querySelector("div.display-number");
    numberScreen.textContent += number;
}

function inputOperator(operator) {
    let numberScreen = document.querySelector("div.display-number");
    let expressionScreen = document.querySelector("div.cache-expression");
    
    expressionScreen.textContent += numberScreen.textContent + operator;

    numberScreen.textContent = "";
}

function startoperation() {

}

function clearScreen() {
    let numberScreen = document.querySelector("div.display-number");
    let expressionScreen = document.querySelector("div.cache-expression");
    
    expressionScreen.textContent = "";
    numberScreen.textContent = "";
}

function readInput(input) {
    console.log(input.target.getAttribute('class'));
    // check if the input button is a number or an operator
    
    let inputClass = input.target.getAttribute('class');
    let buttonValue = input.target.getAttribute('data-key');

    if(inputClass === 'number') {
        //input numbers
        inputNumber(buttonValue);
    } else if (inputClass === 'operator') {
        inputOperator(buttonValue);
    } else if (inputClass === 'clear') {
        clearScreen();
    } else if (inputClass === 'equal') {
        startoperation();
    } else {
        alert("Invalid Selection.")
    }
}

let numberScreen = document.querySelector("div.display-number");
let buttonList = document.querySelectorAll("button");

buttonList.forEach(button => {
    button.addEventListener('click', (e) => {
        readInput(e);
    })
});

