const puppeteer = require("puppeteer");

puppeteer
  .launch({
    headless: false,
    defaultViewport: null,
    args: [
      "--remote-debugging-port=9225",
      "--remote-debugging-address=0.0.0.0",
      "--headless"
    ],
  })
  .then(async (browser) => {
    console.log(browser._connection.url())
  })
// => ws://0.0.0.0:9222/devtools/browser/490a2b32-ce62-4b6b-a530-d4931fdeb046