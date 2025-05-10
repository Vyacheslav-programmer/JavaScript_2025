export class BackButtonComponent {
    // Конструктор принимает родителя
    constructor(parent) {
        this.parent = parent;
    }

    // HTML кнопки "Назад"
    getHTML() {
        return `
            <button id="back-button" class="btn btn-primary" type="button">Назад</button> <!-- Кнопка Bootstrap -->
        `;
    }

    // Добавление обработчика клика
    addListeners(listener) {
        document.getElementById("back-button").addEventListener("click", listener);
    }

    // Рендеринг кнопки
    render(listener) {
        const html = this.getHTML(); // Получение HTML
        this.parent.insertAdjacentHTML('beforeend', html); // Вставка HTML
        this.addListeners(listener); // Добавление обработчика
    }
}
