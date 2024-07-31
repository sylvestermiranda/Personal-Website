const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.display');
let currentInput = '0';
let operator = null;
let previousInput = null;
let isOperatorPressed = false;
const initialFontSize = parseFloat(window.getComputedStyle(display).fontSize);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            handleNumber(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.classList.contains('function')) {
            handleFunction(value);
        }

        updateDisplay();
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/\d/.test(key)) {
        handleNumber(key);
    } else if (key === '.') {
        handleNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === 'Enter' || key === '=') {
        handleOperator(key);
    } else if (key === 'Escape') {
        handleFunction('AC');
    }

    updateDisplay();
});

function handleNumber(value) {
    if (currentInput === '0' || isOperatorPressed) {
        currentInput = value;
        isOperatorPressed = false;
    } else {
        currentInput += value;
    }

    // Format number with commas
    currentInput = formatNumberWithCommas(currentInput);

    // Adjust font size if necessary
    adjustFontSize();
}

function handleOperator(value) {
    if (value === 'Enter' || value === '=') {
        if (operator && previousInput !== null) {
            currentInput = String(calculate(previousInput, currentInput, operator));
            operator = null;
            previousInput = null;
        }
    } else {
        if (operator && previousInput !== null) {
            currentInput = String(calculate(previousInput, currentInput, operator));
        }
        operator = value === '*' ? 'X' : value === '/' ? '÷' : value;
        previousInput = currentInput;
        isOperatorPressed = true;
    }

    // Adjust font size if necessary
    adjustFontSize();
}

function handleFunction(value) {
    if (value === 'AC') {
        currentInput = '0';
        operator = null;
        previousInput = null;
        isOperatorPressed = false;
    } else if (value === '+/-') {
        currentInput = String(-parseFloat(currentInput));
    } else if (value === '%') {
        currentInput = String(parseFloat(currentInput) / 100);
    }

    // Adjust font size if necessary
    adjustFontSize();
}

function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case 'X': return a * b;
        case '÷': return a / b;
    }
}

function updateDisplay() {
    display.textContent = currentInput;
}

function adjustFontSize() {
    const displayWidth = display.getBoundingClientRect().width;
    const textWidth = getTextWidth(currentInput, display.style.fontSize);
    
    if (textWidth > displayWidth) {
        let fontSize = parseFloat(display.style.fontSize);
        while (textWidth > displayWidth && fontSize > 10) { // Ensure font size doesn't go below 10px
            fontSize -= 1;
            textWidth = getTextWidth(currentInput, fontSize + 'px');
        }
        display.style.fontSize = fontSize + 'px';
    } else {
        display.style.fontSize = initialFontSize + 'px'; // Reset to initial size if text fits
    }
}

function getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const width = context.measureText(text).width;
    return width;
}

function formatNumberWithCommas(number) {
    // Remove commas and convert to string
    let numberStr = number.toString().replace(/,/g, '');
    
    // Split number into integer and decimal parts
    let parts = numberStr.split('.');
    
    // Format integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine integer and decimal parts
    return parts.join('.');
}

document.addEventListener("DOMContentLoaded", function() {
    const loader = document.querySelector(".loader");
    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, 2000);  
});

 