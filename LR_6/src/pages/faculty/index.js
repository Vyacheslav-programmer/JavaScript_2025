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

    // Асинхронная загрузка данных факультета
    async getData() {
        try {
            console.log(`Попытка загрузки данных факультета ${this.id} из API`);
            const response = await fetch(`http://localhost:3000/api/faculties/${this.id}`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log(`Данные факультета ${this.id}:`, data);
            if (!data || !data.id) {
                throw new Error('Данные некорректны или отсутствуют');
            }
            return data;
        } catch (error) {
            console.error(`Ошибка при загрузке данных факультета ${this.id}:`, error);
            console.log('Используем запасные данные');
            const faculties = {
                1: {
                    id: 1,
                    src: "https://api.mirror.bmstu.ru/upload/faculty/14/64bf9c97ce763.png",
                    title: "Факультет ГУИМЦ",
                    text: "Головной учебно-исследовательский и методический центр профессиональной реабилитации лиц с ограниченными возможностями здоровья (инвалидов).",
                    departments: [
                        { name: "ИУ5", description: "Системы обработки информации и управления" },
                        { name: "ИУ8", description: "Информационная безопасность" }
                    ]
                },
                2: {
                    id: 2,
                    src: "https://api.mirror.bmstu.ru/upload/faculty/1/64f737e27ab0a.png",
                    title: "Факультет ИУ",
                    text: "Информатика и системы управления - лидер в IT-образовании.",
                    departments: [
                        { name: "ИУ1", description: "Системы автоматического управления" },
                        { name: "ИУ7", description: "Программное обеспечение ЭВМ и информационные технологии" }
                    ]
                },
                3: {
                    id: 3,
                    src: "https://api.mirror.bmstu.ru/upload/faculty/2/64bf9c2a4b80e.png",
                    title: "Факультет ИБМ",
                    text: "Инженерный бизнес и менеджмент для подготовки управленцев.",
                    departments: [
                        { name: "ИБМ1", "description": "Экономика и бизнес" },
                        { name: "ИБМ4", "description": "Менеджмент" }
                    ]
                }
            };
            return faculties[this.id] || faculties[1];
        }
    }

    // Обработчик клика по кнопке "Назад"
    clickBack() {
        console.log('Возврат на главную страницу');
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    // Обработчик клика по кафедре
    async clickDepartment(depName) {
        console.log('Клик по кафедре:', depName);
        const data = await this.getData();
        const department = data.departments.find(dep => dep.name === depName);
        if (department) {
            console.log('Найдена кафедра:', department);
            const deptInfoDiv = document.getElementById('department-info');
            deptInfoDiv.innerHTML = `
                <div class="card mt-3 mx-auto" style="max-width: 540px;">
                    <div class="card-body">
                        <h6 class="card-title text-center">${department.name}</h6>
                        <p class="card-text">${department.description || 'Описание кафедры отсутствует'}</p>
                    </div>
                </div>
            `;
        } else {
            console.error('Кафедра не найдена:', depName);
            const deptInfoDiv = document.getElementById('department-info');
            deptInfoDiv.innerHTML = `
                <div class="alert alert-warning mt-3" role="alert">
                    Кафедра "${depName}" не найдена.
                </div>
            `;
        }
    }

    // Рендеринг страницы факультета
    async render() {
        this.parent.innerHTML = '<div class="text-center">Загрузка...</div>';
        const html = this.getHTML();
        this.parent.innerHTML = html;

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = await this.getData();
        console.log('Данные для рендеринга страницы факультета:', data);
        if (data && data.id) {
            const faculty = new FacultyComponent(this.pageRoot);
            faculty.render(data);

            if (data.departments && Array.isArray(data.departments)) {
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

                const buttons = document.querySelectorAll('.dept-btn');
                buttons.forEach(button => {
                    button.addEventListener('click', () => {
                        // @ts-ignore
                        const depName = button.dataset.dept;
                        this.clickDepartment(depName);
                    });
                });
            } else {
                console.error('Кафедры отсутствуют:', data);
                this.pageRoot.innerHTML += '<p class="text-center text-danger">Кафедры не найдены.</p>';
            }
        } else {
            console.error('Данные факультета отсутствуют:', data);
            this.pageRoot.innerHTML += `
                <div class="alert alert-danger mt-3" role="alert">
                    Ошибка: данные факультета не загружены.
                </div>
            `;
        }
    }
}