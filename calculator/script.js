function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) {
    return "Ehh... no, that's not possible";
  }
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

function updateDisplay(content) {
  display.textContent = content;
}

function clearCalculator() {
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
  updateDisplay('0');
}

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetDisplay) {
    display.textContent = '';
    shouldResetDisplay = false;
  }
  display.textContent += number;
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondNumber = display.textContent;
  let result = operate(currentOperator, firstNumber, secondNumber);
  if (typeof result === "number") {
    result = Math.round(result * 1000) / 1000; 
  }
  updateDisplay(result);
  firstNumber = result;
  currentOperator = null;
}

function appendDecimal() {
  if (shouldResetDisplay) {
    display.textContent = '0';
    shouldResetDisplay = false;
  }
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1) || '0';
}

buttons.forEach(button => {
  if (button.classList.contains('digit')) {
    button.addEventListener('click', () => appendNumber(button.textContent));
  }
  if (button.classList.contains('operator')) {
    button.addEventListener('click', () => setOperator(button.dataset.operator));
  }
  if (button.classList.contains('equals')) {
    button.addEventListener('click', evaluate);
  }
  if (button.dataset.action === 'clear') {
    button.addEventListener('click', clearCalculator);
  }
  if (button.classList.contains('decimal')) {
    button.addEventListener('click', appendDecimal);
  }
  if (button.dataset.action === 'backspace') {
    button.addEventListener('click', backspace);
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (['+', '-', '*', '/'].includes(e.key)) setOperator(e.key);
  if (e.key === 'Enter' || e.key === '=') evaluate();
  if (e.key === '.') appendDecimal();
  if (e.key === 'Backspace') backspace();
  if (e.key === 'Escape') clearCalculator();
});

clearCalculator();


