(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();class d{constructor(t){this.parent=t}render(t,e){if(!t||!t.id||!t.src||!t.title){console.error("Некорректные данные для карточки:",t);return}const n=`
            <div class="card m-2" style="width: 18rem;">
                <img src="${t.src}" class="card-img-top" alt="${t.title}">
                <div class="card-body">
                    <h5 class="card-title">${t.title}</h5>
                    <button class="btn btn-primary" data-id="${t.id}">Подробнее</button>
                </div>
            </div>
        `;this.parent.insertAdjacentHTML("beforeend",n),this.parent.querySelector(`button[data-id="${t.id}"]`).addEventListener("click",e)}}class p{constructor(t){this.parent=t}render(t){if(!t||!t.src||!t.title){console.error("Некорректные данные для информации о факультете:",t);return}const e=`
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${t.src}" class="img-fluid rounded-start" alt="${t.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${t.title}</h5>
                            <p class="card-text">${t.text||"Описание отсутствует"}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;this.parent.insertAdjacentHTML("beforeend",e)}}class u{constructor(t){this.parent=t}render(t){this.parent.insertAdjacentHTML("beforeend",`
            <button class="btn btn-secondary mt-3">Назад</button>
        `),this.parent.querySelector("button").addEventListener("click",t)}}class m{constructor(t,e){this.parent=t,this.id=e}get pageRoot(){return document.getElementById("faculty-page")}getHTML(){return`
            <div class="container mt-4">
                <div id="faculty-page" class="d-flex flex-column align-items-center"></div>
            </div>
        `}async getData(){try{console.log(`Попытка загрузки данных факультета ${this.id} из API`);const t=await fetch(`http://localhost:3000/api/faculties/${this.id}`);if(!t.ok)throw new Error(`Ошибка HTTP: ${t.status}`);const e=await t.json();if(console.log(`Данные факультета ${this.id}:`,e),!e||!e.id)throw new Error("Данные некорректны или отсутствуют");return e}catch(t){console.error(`Ошибка при загрузке данных факультета ${this.id}:`,t),console.log("Используем запасные данные");const e={1:{id:1,src:"https://api.mirror.bmstu.ru/upload/faculty/14/64bf9c97ce763.png",title:"Факультет ГУИМЦ",text:"Головной учебно-исследовательский и методический центр профессиональной реабилитации лиц с ограниченными возможностями здоровья (инвалидов).",departments:[{name:"ИУ5",description:"Системы обработки информации и управления"},{name:"ИУ8",description:"Информационная безопасность"}]},2:{id:2,src:"https://api.mirror.bmstu.ru/upload/faculty/1/64f737e27ab0a.png",title:"Факультет ИУ",text:"Информатика и системы управления - лидер в IT-образовании.",departments:[{name:"ИУ1",description:"Системы автоматического управления"},{name:"ИУ7",description:"Программное обеспечение ЭВМ и информационные технологии"}]},3:{id:3,src:"https://api.mirror.bmstu.ru/upload/faculty/2/64bf9c2a4b80e.png",title:"Факультет ИБМ",text:"Инженерный бизнес и менеджмент для подготовки управленцев.",departments:[{name:"ИБМ1",description:"Экономика и бизнес"},{name:"ИБМ4",description:"Менеджмент"}]}};return e[this.id]||e[1]}}clickBack(){console.log("Возврат на главную страницу"),new a(this.parent).render()}async clickDepartment(t){console.log("Клик по кафедре:",t);const n=(await this.getData()).departments.find(r=>r.name===t);if(n){console.log("Найдена кафедра:",n);const r=document.getElementById("department-info");r.innerHTML=`
                <div class="card mt-3 mx-auto" style="max-width: 540px;">
                    <div class="card-body">
                        <h6 class="card-title text-center">${n.name}</h6>
                        <p class="card-text">${n.description||"Описание кафедры отсутствует"}</p>
                    </div>
                </div>
            `}else{console.error("Кафедра не найдена:",t);const r=document.getElementById("department-info");r.innerHTML=`
                <div class="alert alert-warning mt-3" role="alert">
                    Кафедра "${t}" не найдена.
                </div>
            `}}async render(){this.parent.innerHTML='<div class="text-center">Загрузка...</div>';const t=this.getHTML();this.parent.innerHTML=t,new u(this.pageRoot).render(this.clickBack.bind(this));const n=await this.getData();if(console.log("Данные для рендеринга страницы факультета:",n),n&&n.id)if(new p(this.pageRoot).render(n),n.departments&&Array.isArray(n.departments)){const s=`
                    <div class="mt-3 text-center">
                        <h6>Кафедры факультета:</h6>
                        <div class="d-flex flex-wrap justify-content-center gap-2">
                            ${n.departments.map(i=>`
                                <button class="btn btn-outline-primary dept-btn" data-dept="${i.name}">
                                    ${i.name}
                                </button>
                            `).join("")}
                        </div>
                        <div id="department-info" class="mt-3"></div>
                    </div>
                `;this.pageRoot.insertAdjacentHTML("beforeend",s),document.querySelectorAll(".dept-btn").forEach(i=>{i.addEventListener("click",()=>{const l=i.dataset.dept;this.clickDepartment(l)})})}else console.error("Кафедры отсутствуют:",n),this.pageRoot.innerHTML+='<p class="text-center text-danger">Кафедры не найдены.</p>';else console.error("Данные факультета отсутствуют:",n),this.pageRoot.innerHTML+=`
                <div class="alert alert-danger mt-3" role="alert">
                    Ошибка: данные факультета не загружены.
                </div>
            `}}class a{constructor(t){this.parent=t}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
            <div class="container mt-4">
                <h1 class="text-center mb-4">Факультеты МГТУ им. Н.Э. Баумана</h1>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
        `}async getData(){try{console.log("Попытка загрузки данных из API");const t=await fetch("http://localhost:3000/api/faculties");if(!t.ok)throw new Error(`Ошибка HTTP: ${t.status}`);const e=await t.json();return console.log("Данные из API:",e),Array.isArray(e)?e:[]}catch(t){return console.error("Ошибка при загрузке данных:",t),console.log("Используем локальные запасные данные"),[{id:1,src:"https://api.mirror.bmstu.ru/upload/faculty/14/64bf9c97ce763.png",title:"Факультет ГУИМЦ"},{id:2,src:"https://api.mirror.bmstu.ru/upload/faculty/1/64f737e27ab0a.png",title:"Факультет ИУ"},{id:3,src:"https://api.mirror.bmstu.ru/upload/faculty/2/64bf9c2a4b80e.png",title:"Факультет ИБМ"}]}}async clickCard(t){const e=t.target.dataset.id;console.log("Переход на страницу факультета с ID:",e),await new m(this.parent,e).render()}async render(){this.parent.innerHTML='<div class="text-center">Загрузка...</div>';const t=this.getHTML();this.parent.innerHTML=t;const e=await this.getData();console.log("Данные для рендеринга:",e),Array.isArray(e)&&e.length>0?e.forEach(n=>{new d(this.pageRoot).render(n,this.clickCard.bind(this))}):(console.error("Данные отсутствуют или некорректны:",e),this.pageRoot.innerHTML+='<p class="text-center text-danger">Ошибка: данные не загружены.</p>')}}class h{constructor(){this.root=document.getElementById("root")}async render(){await new a(this.root).render()}}const f=new h;f.render();
