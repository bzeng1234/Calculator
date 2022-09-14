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

