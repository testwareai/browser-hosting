const { chromium } = require('@playwright/test');

const run = async()=>{
    const browser =  await chromium.launchServer();
    const url = await browser.wsEndpoint();
    await console.log(url);
}


run();

