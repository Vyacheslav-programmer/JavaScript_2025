import { FacultyCardComponent } from "../../components/faculty-card/index.js";
import { FacultyPage } from "../faculty/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <h1 class="text-center mb-4">Факультеты МГТУ им. Н.Э. Баумана</h1>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
        `;
    }

    async getData() {
        try {
            const response = await fetch('http://localhost:3000/faculties');
            if (!response.ok) throw new Error('Failed to fetch faculties');
            return await response.json();
        } catch (error) {
            console.error('Error fetching faculties:', error);
            return [];
        }
    }

    clickCard(e) {
        const facultyId = e.target.dataset.id;
        const facultyPage = new FacultyPage(this.parent, facultyId);
        facultyPage.render();
    }

    async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = await this.getData();
        if (data.length === 0) {
            this.pageRoot.innerHTML = '<p class="text-center">Не удалось загрузить данные</p>';
            return;
        }
        data.forEach((item) => {
            const facultyCard = new FacultyCardComponent(this.pageRoot);
            facultyCard.render(item, this.clickCard.bind(this));
        });
    }
}