let currentOperand = '';
let previousOperand = '';
let operation = null;

const displayValue = document.getElementById('displayValue');
const displayOperator = document.getElementById('displayOperator');
const rows = document.querySelectorAll('.row div, .first-row div');

rows.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.textContent.trim();

        if (btn.classList.contains('equal')) {
            compute();
        } else if (value === 'C') {
            clearDisplay();
        } else if (value === 'DEL') {
            currentOperand = currentOperand.slice(0, -1);
            updateDisplay();
        } else if (value === '±') {
            if (currentOperand) {
                currentOperand = (parseFloat(currentOperand) * -1).toString();
                updateDisplay();
            }
        } else if (value === '+' || value === '-' || value === 'x' || value === '/' || value === '%') {
            chooseOperation(value);
        } else if (value === '.') {
            appendNumber('.');
        } else if (!isNaN(value)) {
            appendNumber(value);
        }

    });
});

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op === 'x' ? '*' :
        op === '±' ? '-' :
            op === 'DEL' ? '' : op;
    previousOperand = currentOperand;
    currentOperand = '';
    displayOperator.textContent = op;
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = null;
    previousOperand = '';
    displayOperator.textContent = '';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    displayOperator.textContent = '';
    updateDisplay();
};

function deleteLast() {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
};

function toggleSign() {
    if (currentOperand) {
        currentOperand = (parseFloat(currentOperand) * -1).toString();
        updateDisplay();
    }
};

function updateDisplay() {
    displayValue.textContent = currentOperand || '0';
};

