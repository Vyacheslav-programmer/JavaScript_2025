import './styles.css';
import { MainPage } from './pages/main/index.js';

class App {
    constructor() {
        this.root = document.getElementById('root');
    }

    async render() {
        const mainPage = new MainPage(this.root);
        await mainPage.render();
    }
}

const app = new App();
app.render();