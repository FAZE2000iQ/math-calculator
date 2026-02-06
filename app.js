const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let current = "0";
let previous = null;
let operator = null;
let resetNext = false;

// 🔐 SECRET UNLOCK CODE
const SECRET_CODE = "DDD";

function updateDisplay() {
  display.textContent = current;
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) {
      if (current === "0" || resetNext) {
        current = value;
        resetNext = false;
      } else {
        current += value;
      }
    }

    // 🔓 Check unlock code
    if (current === SECRET_CODE) {
      window.location.href = "proxy.html";
      return;
    }

    if (action === "clear") {
      current = "0";
      previous = null;
      operator = null;
    }

    if (action === "sign") {
      current = (parseFloat(current) * -1).toString();
    }

    if (action === "percent") {
      current = (parseFloat(current) / 100).toString();
    }

    if (btn.classList.contains("op") && value) {
      previous = parseFloat(current);
      operator = value;
      resetNext = true;
    }

    if (action === "equals") {
      if (operator && previous !== null) {
        const result = eval(`${previous} ${operator} ${current}`);
        current = result.toString();
        operator = null;
        previous = null;
      }
    }

    updateDisplay();
  });
});

updateDisplay();
