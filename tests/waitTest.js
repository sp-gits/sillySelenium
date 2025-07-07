import { Builder, By, until } from "selenium-webdriver";
import { expect } from 'chai';

describe('Explicit Wait Example', function () {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('should wait for the element to appear', async () => {
    await driver.get('https://www.saucedemo.com/');

    // Replace with an actual element you expect to appear
    let element = await driver.wait(until.elementLocated(By.id('user-name')), 10000);

    let text = await element.getText();
    console.log('✅ Element Found:', text);

    // You can assert something if needed
    // expect(text).to.equal("Expected Text");
    
  });

  after(async () => {
    await driver.quit();
  });
});
