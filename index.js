const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on("qr", (qr) => {
  console.log("📱 סרוק את הקוד עם וואטסאפ:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ וואטסאפ מחובר!");
});

// בדיקה כל 3 שניות אם יש הודעה לשליחה
setInterval(() => {
  const filePath = path.join(__dirname, "..", "message_to_send.txt");

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8").trim();

    if (data) {
      const [to, message] = data.split("|");

      if (to && message) {
        console.log(`📤 שולח ל־${to}: ${message}`);
        client.sendMessage(to, message);
      }

      fs.unlinkSync(filePath); // מוחק את הקובץ אחרי השליחה
    }
  }
}, 3000);

client.initialize();
