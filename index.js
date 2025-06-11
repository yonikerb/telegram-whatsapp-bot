const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
const path = require("path");
const express = require("express");
const QRCode = require("qrcode");
require("./keepalive");

const app = express();
app.use(express.static("public")); // מאפשר גישה ל־qr.png

app.listen(3000, () => {
  console.log("🌐 Express server is running on port 3000");
});

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on("qr", async (qr) => {
  console.log("📷 שומר את קוד ה־QR לקובץ...");
  await QRCode.toFile("./public/qr.png", qr);
  console.log("✅ סרוק את קוד ה־QR כאן:");
  console.log("https://<your-app-name>.onrender.com/qr.png");
});

client.on("ready", () => {
  console.log("✅ וואטסאפ מחובר!");
});

setInterval(() => {
  const filePath = path.join(__dirname, "message_to_send.txt");

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8").trim();

    if (data) {
      const [to, message] = data.split("|");

      if (to && message) {
        console.log(`📤 שולח ל־${to}: ${message}`);
        client.sendMessage(to, message);
      }

      fs.unlinkSync(filePath);
    }
  }
}, 3000);

client.initialize();
