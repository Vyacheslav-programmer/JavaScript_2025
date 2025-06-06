export class FacultyComponent {
    // Конструктор принимает родителя
    constructor(parent) {
        this.parent = parent;
    }

    // HTML информации о факультете
    getHTML(data) {
        return `
            <div class="card mb-3" style="width: 540px;"> <!-- Карточка Bootstrap -->
                <div class="row g-0"> <!-- Строка без отступов -->
                    <div class="col-md-4"> <!-- Колонка для изображения -->
                        <img src="${data.src}" class="img-fluid" alt="${data.title}"> <!-- Изображение -->
                    </div>
                    <div class="col-md-8"> <!-- Колонка для текста -->
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5> <!-- Название -->
                            <p class="card-text">${data.text}</p> <!-- Описание -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Рендеринг компонента
    render(data) {
        const html = this.getHTML(data); // Получение HTML
        this.parent.insertAdjacentHTML('beforeend', html); // Вставка HTML
    }
}
