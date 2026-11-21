"use strict";

const displayElement = document.querySelector("#calc-display");
const expressionElement = document.querySelector("#calc-expression");
const calcStatus = document.querySelector("#calc-status");
let display = "0";
let firstNumber = null;
let operator = null;
let replaceDisplay = false;
let hasError = false;
const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };

function updateDisplay() {
  displayElement.textContent = display;
  expressionElement.textContent = operator ? `${firstNumber} ${symbols[operator]}` : "";
}

function clearCalculator() {
  display = "0";
  firstNumber = null;
  operator = null;
  replaceDisplay = false;
  hasError = false;
  calcStatus.textContent = "";
}

// Explicit operations keep evaluation limited to arithmetic.
function calculate(left, right, operation) {
  if (operation === "+") return left + right;
  if (operation === "-") return left - right;
  if (operation === "*") return left * right;
  if (operation === "/") return right === 0 ? NaN : left / right;
  return right;
}

function resolveOperation() {
  const result = calculate(firstNumber, Number(display), operator);
  if (!Number.isFinite(result)) {
    display = "Error";
    hasError = true;
    operator = null;
    firstNumber = null;
    calcStatus.textContent = "Cannot divide by zero or display this result. Press AC or enter a digit to start again.";
    return false;
  }
  display = String(Number(result.toPrecision(12)));
  return true;
}

function inputDigit(digit) {
  if (hasError) clearCalculator();
  if (replaceDisplay) { display = digit; replaceDisplay = false; }
  else if (display === "0") display = digit;
  else if (display.replace(/[^0-9]/g, "").length < 12) display += digit;
}

function chooseOperator(nextOperator) {
  if (hasError) return;
  if (operator && !replaceDisplay && !resolveOperation()) return;
  firstNumber = Number(display);
  operator = nextOperator;
  replaceDisplay = true;
}

function runAction(action) {
  if (action === "clear") { clearCalculator(); return; }
  if (hasError) return;
  if (action === "decimal") {
    if (replaceDisplay) { display = "0."; replaceDisplay = false; }
    else if (!display.includes(".") && !display.includes("e")) display += ".";
  } else if (action === "sign") {
    if (Number(display) !== 0) display = display.startsWith("-") ? display.slice(1) : `-${display}`;
    if (operator && replaceDisplay) firstNumber = Number(display);
  } else if (action === "backspace") {
    if (replaceDisplay) return;
    display = display.slice(0, -1);
    if (!display || display === "-" || display.includes("e")) display = "0";
  } else if (action === "equals" && operator && !replaceDisplay) {
    if (resolveOperation()) {
      operator = null;
      firstNumber = null;
      replaceDisplay = true;
    }
  }
}

document.querySelector(".calc-grid").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.digit !== undefined) inputDigit(button.dataset.digit);
  else if (button.dataset.operator) chooseOperator(button.dataset.operator);
  else runAction(button.dataset.action);
  updateDisplay();
});

document.addEventListener("keydown", event => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  // Preserve native activation of focused buttons and links.
  if (event.key === "Enter" && (event.target.closest("button") || event.target.closest("a"))) return;
  if (/^[0-9]$/.test(event.key)) inputDigit(event.key);
  else if (["+", "-", "*", "/"].includes(event.key)) chooseOperator(event.key);
  else if (event.key === ".") runAction("decimal");
  else if (event.key === "Enter" || event.key === "=") runAction("equals");
  else if (event.key === "Escape" || event.key === "Delete") runAction("clear");
  else if (event.key === "Backspace") runAction("backspace");
  else return;
  event.preventDefault();
  updateDisplay();
});
updateDisplay();
