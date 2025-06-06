import { FacultyComponent } from "../../components/faculty-info/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class FacultyPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('faculty-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div id="faculty-page" class="d-flex flex-column align-items-center"></div>
            </div>
        `;
    }

    // Данные факультетов с кафедрами и их описаниями
    getData() {
        const faculties = {
            1: {
                id: 1,
                src: "https://api.mirror.bmstu.ru/upload/faculty/14/64bf9c97ce763.png",
                title: "Факультет ГУИМЦ",
                text: "Головной учебно-исследовательский и методический центр профессиональной реабилитации лиц с ограниченными возможностями здоровья (инвалидов).",
                departments: [
                    { name: "ИУ5", description: "Системы обработки информации и управления" },
                    { name: "ИУ8", description: "Информационная безопасность" },
                    { name: "ИБМ3", description: "Промышленная логистика" },
                    { name: "РК9", description: "Компьютерные системы автоматизации производства" },
                    { name: "МТ4", description: "Метрология и взаимозаменяемость" },
                    { name: "МТ8", description: "Материаловедение" }
                ]
            },
            2: {
                id: 2,
                src: "https://api.mirror.bmstu.ru/upload/faculty/2/64bf9c2a4b80e.png",
                title: "Факультет ИУ",
                text: "Информатика и системы управления - лидер в IT-образовании.",
                departments: [
                    { name: "ИУ1", description: "Системы автоматического управления" },
                    { name: "ИУ2", description: "Приборы и системы ориентации, стабилизации и навигации" },
                    { name: "ИУ3", description: "Информационные системы и телекоммуникации" },
                    { name: "ИУ4", description: "Проектирование и технология производства электронной аппаратуры" },
                    { name: "ИУ5", description: "Системы обработки информации и управления" },
                    { name: "ИУ6", description: "Компьютерные системы и сети" },
                    { name: "ИУ7", description: "Программное обеспечение ЭВМ и информационные технологии" },
                    { name: "ИУ8", description: "Информационная безопасность" },
                    { name: "ИУ9", description: "Теоретическая информатика и компьютерные технологии" },
                    { name: "ИУ10", description: "Защита информации" },
                    { name: "ИУ11", description: "ЗКосмические приборы и системы" },
                    { name: "ИУ12", description: "Технологии искусственного интеллекта" }
                ]
            },
            3: {
                id: 3,
                src: "https://api.mirror.bmstu.ru/upload/faculty/2/64bf9c2a4b80e.png",
                title: "Факультет ИБМ",
                text: "Инженерный бизнес и менеджмент для подготовки управленцев.",
                departments: [
                    { name: "ИБМ1", description: "Экономика и бизнес" },
                    { name: "ИБМ2", description: "Экономика и организация производства" },
                    { name: "ИБМ3", description: "Промышленная логистика" },
                    { name: "ИБМ4", description: "Менеджмент" },
                    { name: "ИБМ5", description: "Финансы" },
                    { name: "ИБМ6", description: "Бизнес-информатика" },
                    { name: "ИБМ7", description: "Инновационное предпринимательство" }
                ]
            }
        };
        return faculties[this.id] || faculties[1];
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    // Обработчик клика по кафедре
    clickDepartment(depName) {
        const data = this.getData();
        const department = data.departments.find(dep => dep.name === depName);
        if (department) {
            const deptInfoDiv = document.getElementById('department-info');
            deptInfoDiv.innerHTML = `
                <div class="card mt-3 mx-auto" style="max-width: 540px;">
                    <div class="card-body">
                        <h6 class="card-title text-center">${department.name}</h6>
                        <p class="card-text">${department.description}</p>
                    </div>
                </div>
            `;
        }
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Кнопка "Назад"
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        // Информация о факультете
        const data = this.getData();
        const faculty = new FacultyComponent(this.pageRoot);
        faculty.render(data);

        // Список кафедр (кликабельные кнопки)
        const departmentsHTML = `
            <div class="mt-3 text-center">
                <h6>Кафедры факультета:</h6>
                <div class="d-flex flex-wrap justify-content-center gap-2">
                    ${data.departments.map(dep => `
                        <button class="btn btn-outline-primary dept-btn" data-dept="${dep.name}">
                            ${dep.name}
                        </button>
                    `).join('')}
                </div>
                <div id="department-info" class="mt-3"></div>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforeend', departmentsHTML);

        // Добавляем слушатели для кнопок кафедр
        const buttons = document.querySelectorAll('.dept-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const deptName = button.dataset.dept;
                this.clickDepartment(deptName);
            });
        });
    }
}
