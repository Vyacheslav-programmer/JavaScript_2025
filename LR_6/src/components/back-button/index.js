export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(clickCallback) {
        const html = `
            <button class="btn btn-secondary mt-3">Назад</button>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
        const button = this.parent.querySelector('button');
        button.addEventListener('click', clickCallback);
    }
}