const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launchServer();

  console.log(browser.wsEndpoint());
})();
