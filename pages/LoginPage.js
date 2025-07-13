import { By } from 'selenium-webdriver';

export default class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameInput = By.id('username');
        this.passwordInput = By.id('password');
        this.loginButton = By.id('login');
    }

    async enterUsername(username) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
    }

    async enterPassword(password) {
        await this.driver.findElement(this.passwordInput).sendKeys(password);
    }

    async clickLogin() {
        await this.driver.findElement(this.loginButton).click();
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}
