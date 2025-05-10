// Массив названий товаров для поиска в интернет-магазине
const productNames = ["Smart", "Smartphone", "Lap", "Laptop", "Tablet", "Head"]; // Возможные префиксы товаров

// Поисковый запрос пользователя
const searchQuery = "Smartphone Galaxy S23"; // Пример запроса, который ввел пользователь

// Функция для подсчета количества названий, являющихся префиксами запроса
function countProductPrefixes(names, query) {
    let prefixCount = 0; // Счетчик префиксов
    let prefixes = []; // Массив для хранения найденных префиксов
    let currentIndex = 0; // Индекс для перебора массива

    // Цикл с постусловием: проверяем каждое название в массиве
    do {
        // Приводим название товара и запрос к нижнему регистру для корректного сравнения
        const productName = names[currentIndex].toLowerCase();
        // Проверяем, начинается ли запрос с текущего названия
        if (query.toLowerCase().startsWith(productName)) {
            prefixCount++; // Увеличиваем счетчик, если нашли префикс
            prefixes.push(names[currentIndex]); // Добавляем оригинальное название в массив префиксов
        }
        currentIndex++; // Переходим к следующему элементу массива
    } while (currentIndex < names.length); // Условие: продолжаем, пока не проверим все элементы

    // Возвращаем объект с количеством префиксов и массивом префиксов
    return { count: prefixCount, prefixes: prefixes };
}

// Выполняем функцию и сохраняем результат
const result = countProductPrefixes(productNames, searchQuery);

// Выводим результаты в консоль
console.log(`Поисковый запрос: "${searchQuery}"`); // Показываем запрос пользователя
console.log(`Количество префиксов среди названий товаров: ${result.count} ("${result.prefixes.join('", "')}")`); // Показываем результат
