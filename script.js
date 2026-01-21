let display = "0";
let operand1 = null;
let operand2 = null;
let operator = null;
let history = [];
function updateDisplay() {
  document.getElementById("display").textContent = display;
}
function appendDigit(digit) {
  if (display === "0" && digit === 0) return;

  if (display === "0") {
    display = String(digit);
  } else {
    display += digit;
  }
  updateDisplay();
}
function appendDecimal() {
  if (!display.includes(".")) {
    display += ".";
    updateDisplay();
  }
}
function selectOperator(op) {
  if (operand1 === null) {
    operand1 = Number(display);
  } else {
    calculate();
  }
  operator = op;
  display = "";
}
function calculate() {
  if (operator === null) return;

  operand2 = Number(display);

  if (operator === "÷" && operand2 === 0) {
    alert("Cannot divide by zero!");
    clearAll();
    return;
  }

  let result;
  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "×":
      result = operand1 * operand2;
      break;
    case "÷":
      result = operand1 / operand2;
      break;
  }

  history.push(`${operand1} ${operator} ${operand2} = ${result}`);

  display = String(result);
  operand1 = null;
  operator = null;
  operand2 = null;

  updateDisplay();
  updateHistoryDisplay();
}
function clearAll() {
  display = "0";
  operand1 = null;
  operand2 = null;
  operator = null;
  updateDisplay();
}
function updateHistoryDisplay() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = history
    .slice(-5)
    .reverse()
    .map(item => `<p>• ${item}</p>`)
    .join("");
}
for (let i = 0; i <= 9; i++) {
  document
    .getElementById(`btn-${i}`)
    .addEventListener("click", () => appendDigit(i));
}

document.getElementById("btn-add").addEventListener("click", () => selectOperator("+"));
document.getElementById("btn-subtract").addEventListener("click", () => selectOperator("-"));
document.getElementById("btn-multiply").addEventListener("click", () => selectOperator("×"));
document.getElementById("btn-divide").addEventListener("click", () => selectOperator("÷"));

document.getElementById("btn-decimal").addEventListener("click", appendDecimal);
document.getElementById("btn-equals").addEventListener("click", calculate);
document.getElementById("btn-clear").addEventListener("click", clearAll);
