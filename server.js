const { chromium } = require('@playwright/test');

const run = ()=>{
    console.log(chromium.launchServer().wsEndpoint());
}


run();

