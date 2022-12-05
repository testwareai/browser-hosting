const { chromium } = require('@playwright/test');

const run = ()=>{
    const browser = chromium.launchServer();
    const url = browser.wsEndpoint();
    console.log(url)
}


run();

