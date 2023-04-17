const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launchServer();

  console.log(browser.wsEndpoint());
})();
