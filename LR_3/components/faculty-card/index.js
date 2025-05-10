export class FacultyCardComponent {
    // Конструктор принимает родителя
    constructor(parent) {
        this.parent = parent;
    }

    // HTML карточки факультета
    getHTML(data) {
        return `
            <div class="card" style="width: 300px;"> <!-- Карточка Bootstrap с фиксированной шириной -->
                <img class="card-img-top" src="${data.src}" alt="${data.title}"> <!-- Изображение -->
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5> <!-- Название -->
                    <p class="card-text">${data.text}</p> <!-- Краткое описание -->
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button> <!-- Кнопка -->
                </div>
            </div>
        `;
    }

    // Добавление обработчика клика
    addListeners(data, listener) {
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
    }

    // Рендеринг карточки
    render(data, listener) {
        const html = this.getHTML(data); // Получение HTML
        this.parent.insertAdjacentHTML('beforeend', html); // Вставка HTML
        this.addListeners(data, listener); // Добавление обработчика
    }
}
