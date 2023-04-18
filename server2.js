const { chromium } = require("playwright");
const http = require("http");
const WebSocket = require("ws");

const PORT = 5000;

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
      <head>
        <title>Remote Control</title>
        <script>
          const ws = new WebSocket('wss://' + location.hostname + ':${PORT}');
          ws.addEventListener('open', () => {
            console.log('Connected to server');
          });
          ws.addEventListener('message', event => {
            const data = JSON.parse(event.data);
            if (data.type === 'goto') {
              window.location.href = data.url;
            } else if (data.type === 'click') {
              const element = document.querySelector(data.selector);
              if (element) {
                element.click();
              }
            }
          });
        </script>
      </head>
      <body>
        <h1>Remote Control</h1>
      </body>
      </html>
    `);
  });

  const wss = new WebSocket.Server({ server });
  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);

      const { type, ...payload } = JSON.parse(message);
      switch (type) {
        case "goto":
          page.goto(payload.url).catch((error) => {
            console.error(`Error: ${error}`);
          });
          break;
        case "click":
          page.click(payload.selector).catch((error) => {
            console.error(`Error: ${error}`);
          });
          break;
        default:
          console.error(`Unknown message type: ${type}`);
          break;
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})().catch((error) => {
  console.error(`Error: ${error}`);
});
