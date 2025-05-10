// Массив цен товаров в интернет-магазине электроники
const productPrices = [599, 1299, 249, 799, 399]; // Цены: смартфон, ноутбук, часы, планшет, наушники

// Функция для поиска максимальной качественной разницы между парами цен товаров
function findMaxPriceDifference(prices) {
    // Переменные для хранения максимальной разницы и лучших пар
    let maxDifference = 0; // Максимальная разница между произведениями пар
    let bestPair1 = [];    // Первая пара товаров с наибольшим произведением
    let bestPair2 = [];    // Вторая пара товаров с меньшим произведением

    // Вложенные циклы для перебора всех возможных комбинаций четырех индексов
    for (let w = 0; w < prices.length; w++) { // Первый индекс первой пары
        for (let x = w + 1; x < prices.length; x++) { // Второй индекс первой пары
            for (let y = 0; y < prices.length; y++) { // Первый индекс второй пары
                for (let z = y + 1; z < prices.length; z++) { // Второй индекс второй пары
                    // Проверяем, что все индексы уникальны (не пересекаются)
                    if (w !== y && w !== z && x !== y && x !== z) {
                        // Вычисляем разницу между произведениями двух пар
                        const difference = (prices[w] * prices[x]) - (prices[y] * prices[z]);
                        // Если текущая разница больше максимальной, обновляем значения
                        if (difference > maxDifference) {
                            maxDifference = difference; // Сохраняем новую максимальную разницу
                            bestPair1 = [prices[w], prices[x]]; // Сохраняем первую пару
                            bestPair2 = [prices[y], prices[z]]; // Сохраняем вторую пару
                        }
                    }
                }
            }
        }
    }

    // Возвращаем объект с результатами
    return { maxDifference, bestPair1, bestPair2 };
}

// Выполняем функцию и сохраняем результат
const result = findMaxPriceDifference(productPrices);

// Выводим результаты в консоль
console.log("Анализ цен товаров:"); // Заголовок для вывода
console.log(`Максимальная разница: ${result.maxDifference}`); // Показываем максимальную разницу
console.log(`Пара 1: ${result.bestPair1[0]} x ${result.bestPair1[1]}`); // Первая пара цен
console.log(`Пара 2: ${result.bestPair2[0]} x ${result.bestPair2[1]}`); // Вторая пара цен
