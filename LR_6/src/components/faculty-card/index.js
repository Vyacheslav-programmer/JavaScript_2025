export class FacultyCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data, clickCallback) {
        if (!data || !data.id || !data.src || !data.title) {
            console.error('Некорректные данные для карточки:', data);
            return;
        }
        const html = `
            <div class="card m-2" style="width: 18rem;">
                <img src="${data.src}" class="card-img-top" alt="${data.title}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <button class="btn btn-primary" data-id="${data.id}">Подробнее</button>
                </div>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
        const button = this.parent.querySelector(`button[data-id="${data.id}"]`);
        button.addEventListener('click', clickCallback);
    }
}