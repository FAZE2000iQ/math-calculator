const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Calculator state
let current = "0";
let previous = null;
let operator = null;
let waitingForNewNumber = false;

// 🔐 Secret unlock code
const SECRET_CODE = "94087";

function updateDisplay() {
  display.textContent = current;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    // NUMBER BUTTONS
    if (value !== undefined) {
      if (current === "0" || waitingForNewNumber) {
        current = value;
        waitingForNewNumber = false;
      } else {
        current += value;
      }
    }

    // 🔓 CHECK SECRET CODE
    if (current === SECRET_CODE) {
      window.location.href = "hub.html";
      return;
    }

    // CLEAR
    if (action === "clear") {
      current = "0";
      previous = null;
      operator = null;
      waitingForNewNumber = false;
    }

    // SIGN
    if (action === "sign") {
      current = (parseFloat(current) * -1).toString();
    }

    // PERCENT
    if (action === "percent") {
      current = (parseFloat(current) / 100).toString();
    }

    // OPERATOR
    if (button.classList.contains("op") && value) {
      previous = parseFloat(current);
      operator = value;
      waitingForNewNumber = true;
    }

    // EQUALS
    if (action === "equals") {
      if (operator && previous !== null) {
        let result;

        switch (operator) {
          case "+": result = previous + parseFloat(current); break;
          case "-": result = previous - parseFloat(current); break;
          case "*": result = previous * parseFloat(current); break;
          case "/": result = previous / parseFloat(current); break;
        }

        current = result.toString();
        previous = null;
        operator = null;
        waitingForNewNumber = true;
      }
    }

    updateDisplay();
  });
});

updateDisplay();
