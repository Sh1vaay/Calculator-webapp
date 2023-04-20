// Get references to HTML elements
const result = document.getElementById('result');
const keys = document.querySelector('.keys');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');

// Add event listeners to keys
keys.addEventListener('click', event => {
  const key = event.target;
  const keyValue = key.textContent;
  const resultValue = result.textContent;

  // Handle number keys
  if (!isNaN(keyValue) || keyValue === '.') {
    if (resultValue === '0' || result.dataset.newValue) {
      result.textContent = keyValue;
      delete result.dataset.newValue;
    } else {
      result.textContent += keyValue;
    }
  }

  // Handle operator keys
  if (key.classList.contains('operator')) {
    result.dataset.newValue = true;
    result.dataset.operator = key.id;
  }

  // Handle equals key
  if (key === equalsBtn) {
    const operator = result.dataset.operator;
    const currentValue = parseFloat(resultValue);
    const previousValue = parseFloat(result.dataset.previousValue);

    if (operator === 'add') {
    result.textContent = previousValue + currentValue;
} else if (operator === 'subtract') {
    result.textContent = previousValue - currentValue;
    } else if (operator === 'multiply') {
    result.textContent = previousValue * currentValue;
    } else if (operator === 'divide') {
    result.textContent = previousValue / currentValue;
    }
    
    delete result.dataset.newValue;
    delete result.dataset.previousValue;
    }
    
    // Handle clear key
    if (key === clearBtn) {
    result.textContent = '0';
    delete result.dataset.newValue;
    delete result.dataset.previousValue;
    }
    
    // Store previous value and operator in dataset
    if (!result.dataset.newValue && result.dataset.operator) {
    result.dataset.previousValue = resultValue;
    }
});