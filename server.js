const { chromium } = require("playwright");

(async () => {
  try {
    const browser = await chromium.launchServer();

    console.log(browser.wsEndpoint());
  } catch (error) {
    console.log(error);
  }
})();
