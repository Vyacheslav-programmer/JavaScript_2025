export class FacultyComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data) {
        if (!data || !data.src || !data.title) {
            console.error('Некорректные данные для информации о факультете:', data);
            return;
        }
        const html = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.src}" class="img-fluid rounded-start" alt="${data.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.text || 'Описание отсутствует'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}