import { Builder } from 'selenium-webdriver';
import LoginPage from '../pages/LoginPage.js'

describe('Login Tests', function () {
    let driver;
    let loginPage;
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
    });
    after(async function () {
        await driver.quit();
    });
    it('should log in successfully with correct credentials', async function () {
        await driver.get('https://practice.expandtesting.com/login');
        await loginPage.login('practice', 'SuperSecretPassword!');
    });
});
