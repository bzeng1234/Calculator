// math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return (a * b).toFixed(3);
}

function divide(a, b) {
    if (b == 0) {
        return -1;
    }
    return (a / b).toFixed(3);
}

function operate(expression) {
    // empties the expression array and stores popped values in variable
    let secondNum = parseFloat(expression.pop());
    let operation = expression.pop();
    let firstNum = parseFloat(expression.pop());
    
    let result = 0;

    // call correct function based on operations
    switch (operation) {
        case '+':
            result = add(firstNum, secondNum);
            break;
        case '-':
            result = subtract(firstNum, secondNum);
            break;
        case '*':
            result = multiply(firstNum, secondNum);
            break;
        case '/':
            result = divide(firstNum, secondNum);
            break;
        default:
            alert("Invalid operation.")
            break;
    }
    return result.toString();
}

// currently not in use
function displayValue(a) {
    if (!isNaN(a)) {
        let number_screen = document.querySelector('.display-number');
        number_screen.textContent = number_screen.textContent.concat(a);
    } else {
        let cache_screen = document.querySelector('.cache-expression');
        cache_screen.textContent = cache_screen.textContent.concat(a);
    }
}

function inputNumber(number) {
    let numberScreen = document.querySelector("div.display-number");

    // check to not allow multiple decimals in the same number
    // 1.2.3 BAD 1.23 GOOD
    if (numberScreen.textContent.includes('.') && number === '.') {
        return;   
    }

    // if a new number is clicked after a result and equal sign, start new expression
    // ex. 10= ---> CLEAR SCREEN + EXPRESSION ---> 20
    if (expression.length == 1) {
        expression = [];
        let expressionScreen = document.querySelector("div.cache-expression");
        expressionScreen.textContent = "";
    }

    numberScreen.textContent += number;
}

function inputOperator(operator) {
    let numberScreen = document.querySelector("div.display-number");
    let expressionScreen = document.querySelector("div.cache-expression");

    // if were starting a new equation
    if (expression.length == 0) {
        
        // check if there is a number input given
        if (numberScreen.textContent !== "") {
            // if there is a number given, add to expression array
            // ex. [9]
            expression.push(numberScreen.textContent);
            // check if the input operator is an equal sign
            if (operator !== '=') {
                // if it is not an equal sign, we add it to expression array
                // ex. [9,+] GOOD, [9,=] BAD
                expression.push(operator);
            }
            // output the expression on the screen regardless of the input operator
            expressionScreen.textContent = numberScreen.textContent + operator;
        } else {
            // if no number is given, don't do anything to expression array or screen.
            return;
        }
    // check if we inputted the first half of the expression already
    } else if (expression.length == 2) {
        // check if we provided the second number of the expression
        if (numberScreen.textContent !== '') {
            // if we did, we push it into the expression array
            // ex. [9,+,1] GOOD
            expression.push(numberScreen.textContent);
            // call to start the operation on the expression array
            // NOTE: startOperation empties the expression array
            // ex. [] after return
            let result = operate(expression);
            if (result == -1) {
                numberScreen.textContent = "MATH ERROR. CLEAR SCREEN";
                return;
            }
            // push resulting value into expression array in case we want to use it for another expression
            // ex. [9,+,1] ---> [10]
            expression.push(result);
            // check the input operator that we intend on using next expression
            if (operator !== '=') {
                // if it is not an equal sign, we add it to expression array
                // ex. [10,*] GOOD, [10,=] BAD
                expression.push(operator);
            }
            // output the resulting expression on the screen
            // ex. 10-
            expressionScreen.textContent = result + operator;
        // check if we didn't provide a second number, mainly if we want to change operators on the expression
        } else if (numberScreen.textContent === '') {
            // pop the old operator from the array
            // ex. [9,+] BEFORE ---> [9] AFTER
            expression.pop();
            // check the input operator that we want to use
            if (operator !== '=') {
                // if it is not an equal sign, we add it to expression array
                // ex. [9,/] GOOD, [9,=] BAD
                expression.push(operator);
            }
            // trim the operator from the expression shown on the screen. It's normally the last character.
            // then concat with the new operator.
            // ex. 9+ BEFORE ---> 9/ AFTER
            let lastIndex = expressionScreen.textContent.length-1;
            expressionScreen.textContent = expressionScreen.textContent.slice(0, lastIndex) + operator;                 
        }
    // end up here if you finished evaluating an expression by pressing the equal sign and want to change the 
    // current operator value
    // ex. PRESSED 9, +, 1, = ---> 10= (shown in screen) ---> PRESSED +,-,*,/    
    } else if (expression.length == 1) {
        // check the input operator that we want to use
        if (operator !== '=') {
            // if it is not an equal sign, we add it to expression array
            // ex. [10] BEFORE ---> [10,/] AFTER
            // REMEMBER: WE DONT ADD EQUAL SIGN TO EXPRESSION ARRAY
            expression.push(operator);
        }
        // trim the operator from the expression shown on the screen. It's normally the last character.
        // then concat with the new operator.
        // ex. 10= BEFORE ---> 10/ AFTER
        let lastIndex = expressionScreen.textContent.length-1;
        expressionScreen.textContent = expressionScreen.textContent.slice(0, lastIndex) + operator;                 
    }
    numberScreen.textContent = "";
}

// clear the expression, number screen, and expression array when the clear button is pressed
function clearScreen() {
    let numberScreen = document.querySelector("div.display-number");
    let expressionScreen = document.querySelector("div.cache-expression");

    expressionScreen.textContent = "";
    numberScreen.textContent = "";
    expression = [];
}

// read input from the button clicks and evaluate based on type of button class pressed
function readInput(input) {
    console.log(input.target.getAttribute('class'));
    // check if the input button is a number or an operator
    
    let inputClass = input.target.getAttribute('class');
    let buttonValue = input.target.getAttribute('data-key');

    if(inputClass === 'number' || inputClass === 'decimal') {
        // input numbers
        inputNumber(buttonValue);
    } else if (inputClass === 'operator') {
        // input operator
        inputOperator(buttonValue);
    } else if (inputClass === 'clear') {
        // input clear screen
        clearScreen();
    } else if (inputClass === 'equal') {
        // input equal sign
        inputOperator(buttonValue);
    } else {
        alert("Invalid Operation Selected.")
    }
}

// declare button list
let buttonList = document.querySelectorAll("button");
// declare empty expression array
let expression = [];

// add event listeners to all the buttons and call function based on event
buttonList.forEach(button => {
    button.addEventListener('click', (e) => {
        readInput(e);
    })
});

