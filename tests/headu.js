import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { expect } from 'chai';

describe('Headless Test Example', async function () {
  let driver;

    before(async () => {
        const options = new chrome.Options();
        options.addArguments('--headless');           // ✅ Headless mode
        options.addArguments('--disable-gpu');        // ✅ GPU off (for stability)
        options.addArguments('--window-size=1920,1080'); // ✅ simulate desktop screen

        driver = await new Builder()
          .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    });

    it('should load saucedemo and check logo after login', async () => {
        await driver.get('https://www.saucedemo.com');

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        const logo = await driver.wait(until.elementLocated(By.className('app_logo')), 5000);
        const logoText = await logo.getText();
        expect(logoText).to.equal('Swag Labs');
    });

    after(async () => {
    await driver.quit();
    });
    
});
