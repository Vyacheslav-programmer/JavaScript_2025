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

    getData() {
        return [
            {
                id: 1,
                src: "https://api.mirror.bmstu.ru/upload/faculty/14/64bf9c97ce763.png",
                title: "Факультет ГУИМЦ",
                text: "Головной учебно-исследовательский и методический центр профессиональной реабилитации лиц с ограниченными возможностями здоровья (инвалидов)."
            },
            {
                id: 2,
                src: "https://api.mirror.bmstu.ru/upload/faculty/1/64f737e27ab0a.png",
                title: "Факультет ИУ",
                text: "Информатика и системы управления."
            },
            {
                id: 3,
                src: "https://api.mirror.bmstu.ru/upload/faculty/2/64bf9c2a4b80e.png",
                title: "Факультет ИБМ",
                text: "Инженерный бизнес и менеджмент."
            }
        ];
    }

    clickCard(e) {
        const facultyId = e.target.dataset.id;
        const facultyPage = new FacultyPage(this.parent, facultyId);
        facultyPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const facultyCard = new FacultyCardComponent(this.pageRoot);
            facultyCard.render(item, this.clickCard.bind(this));
        });
    }
}
