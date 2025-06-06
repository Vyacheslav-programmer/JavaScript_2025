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

    // Асинхронная загрузка данных с API
    async getData() {
        try {
            console.log('Попытка загрузки данных из API');
            const response = await fetch('http://localhost:3000/api/faculties');
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log('Данные из API:', data);
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            console.log('Используем локальные запасные данные');
            return [
                {
                    id: 1,
                    src: "https://api.mirror.bmstu.ru/upload/faculty/14/64bf9c97ce763.png",
                    title: "Факультет ГУИМЦ"
                },
                {
                    id: 2,
                    src: "https://api.mirror.bmstu.ru/upload/faculty/1/64f737e27ab0a.png",
                    title: "Факультет ИУ"
                },
                {
                    id: 3,
                    src: "https://api.mirror.bmstu.ru/upload/faculty/2/64bf9c2a4b80e.png",
                    title: "Факультет ИБМ"
                }
            ];
        }
    }

    // Обработчик клика по кнопке "Подробнее"
    async clickCard(e) {
        const facultyId = e.target.dataset.id;
        console.log('Переход на страницу факультета с ID:', facultyId);
        const facultyPage = new FacultyPage(this.parent, facultyId);
        await facultyPage.render();
    }

    // Рендеринг главной страницы
    async render() {
        this.parent.innerHTML = '<div class="text-center">Загрузка...</div>';
        const html = this.getHTML();
        this.parent.innerHTML = html;

        const data = await this.getData();
        console.log('Данные для рендеринга:', data);
        if (Array.isArray(data) && data.length > 0) {
            data.forEach((item) => {
                const facultyCard = new FacultyCardComponent(this.pageRoot);
                facultyCard.render(item, this.clickCard.bind(this));
            });
        } else {
            console.error('Данные отсутствуют или некорректны:', data);
            this.pageRoot.innerHTML += '<p class="text-center text-danger">Ошибка: данные не загружены.</p>';
        }
    }
}