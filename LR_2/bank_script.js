// Глобальные переменные для работы калькулятора
let currentInput = '0'; // Текущее вводимое значение
let previousInput = ''; // Предыдущее значение
let operation = null; // Текущая операция (+, -, x, /)
let history = []; // Массив для хранения истории операций

// Получаем элементы DOM
const resultDisplay = document.getElementById('result'); // Экран калькулятора
const historyContent = document.getElementById('history-content'); // Контейнер истории
const MAX_DISPLAY_LENGTH = 12; // Максимальная длина числа на экране

// Форматирование числа для отображения
function formatDisplay(number) {
    let str = number.toString();
    if (str === 'Ошибка') return str;

    // Округляем до 10 знаков после запятой и убираем лишние нули
    let formatted = parseFloat(number.toFixed(10)).toString().replace(/\.?0+$/, '');
    
    // Если число слишком длинное, обрезаем или переводим в экспоненциальную форму
    if (formatted.length > MAX_DISPLAY_LENGTH) {
        if (formatted.includes('.')) {
            const [integerPart, decimalPart] = formatted.split('.');
            if (integerPart.length > MAX_DISPLAY_LENGTH) {
                return parseFloat(number).toExponential(5);
            }
            const availableDecimals = MAX_DISPLAY_LENGTH - integerPart.length - 1;
            return `${integerPart}.${decimalPart.slice(0, availableDecimals)}`;
        } else {
            return parseFloat(number).toExponential(5);
        }
    }
    return formatted;
}

// Обновление отображения на экране калькулятора
function updateDisplay() {
    resultDisplay.textContent = currentInput;
}

// Добавление операции в историю
function addToHistory(expr, result) {
    history.push(`${expr} = ${result}`);
    updateHistoryDisplay();
}

// Обновление отображения истории
function updateHistoryDisplay() {
    if (history.length === 0) {
        historyContent.innerHTML = '<p>История пуста</p>';
    } else {
        historyContent.innerHTML = history.map(item => `<p>${item}</p>`).join('');
    }
}

// Показать главную страницу (калькулятор)
function showMain() {
    document.getElementById('calculator').style.display = 'block';
    document.getElementById('history').style.display = 'none';
}

// Показать страницу истории
function showHistory() {
    document.getElementById('calculator').style.display = 'none';
    document.getElementById('history').style.display = 'block';
    updateHistoryDisplay();
}

// Выполнение вычислений
function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'x':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Ошибка';
            break;
        default:
            return;
    }

    const expression = `${previousInput} ${operation} ${currentInput}`;
    currentInput = result === 'Ошибка' ? result : formatDisplay(result);
    addToHistory(expression, currentInput);
    updateDisplay();
}

// Обработчик событий для всех кнопок
document.querySelectorAll('.my-btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Обработка ввода цифр и точки
        if (/[0-9.]/.test(value)) {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                return;
            } else if (currentInput.length >= MAX_DISPLAY_LENGTH) {
                return;
            } else {
                currentInput += value;
            }
            updateDisplay();
        }

        // Обработка операций (+, -, x, /)
        if (['+', '-', 'x', '/'].includes(value)) {
            if (operation && previousInput) {
                calculate();
            }
            operation = value;
            previousInput = currentInput;
            currentInput = '0';
            updateDisplay();
        }

        // Обработка кнопки равно
        if (value === '=') {
            if (operation && previousInput) {
                calculate();
                operation = null;
                previousInput = '';
            }
        }

        // Сброс калькулятора
        if (value === 'C') {
            currentInput = '0';
            previousInput = '';
            operation = null;
            updateDisplay();
        }

        // Смена знака числа
        if (value === '+/-') {
            const result = parseFloat(currentInput) * -1;
            currentInput = formatDisplay(result);
            addToHistory(`+/- (${currentInput})`, currentInput);
            updateDisplay();
        }

        // Вычисление процента
        if (value === '%') {
            if (previousInput && operation) {
                const percent = (parseFloat(previousInput) * parseFloat(currentInput)) / 100;
                currentInput = formatDisplay(percent);
                addToHistory(`${previousInput} ${operation} ${currentInput}%`, currentInput);
            } else {
                const percent = parseFloat(currentInput) / 100;
                currentInput = formatDisplay(percent);
                addToHistory(`${currentInput} %`, currentInput);
            }
            updateDisplay();
        }

        // Вычисление квадратного корня
        if (value === '√') {
            const sqrtResult = Math.sqrt(parseFloat(currentInput));
            if (isNaN(sqrtResult)) {
                currentInput = 'Ошибка';
            } else {
                currentInput = formatDisplay(sqrtResult);
                addToHistory(`√(${previousInput || currentInput})`, currentInput);
            }
            updateDisplay();
        }

        // Вычисление модуля числа
        if (value === '|x|') {
            const absResult = Math.abs(parseFloat(currentInput));
            currentInput = formatDisplay(absResult);
            addToHistory(`|${currentInput}|`, currentInput);
            updateDisplay();
        }
    });
});
