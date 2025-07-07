import { Builder, By, until } from "selenium-webdriver";
import { expect } from 'chai';

describe('Explicit Wait Example', function () {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('should log in and verify logo appears', async () => {
    await driver.get('https://www.saucedemo.com/');

    // Wait for login input field
    await driver.wait(until.elementLocated(By.id('user-name')), 5000);

    // Fill login form
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    // Wait until the inventory page loads (logo appears)
    const logo = await driver.wait(until.elementLocated(By.className('app_logo')), 5000);

    const logoText = await logo.getText();
    console.log("✅ Logo Text:", logoText);

    expect(logoText).to.equal('Swag Labs');
  });

  after(async () => {
    await driver.quit();
  });
});
