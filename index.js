// bot.js

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const TelegramBot = require("node-telegram-bot-api");

const TARGET_PHONE = "972532490351@c.us"; // עדכן כאן את מספר וואטסאפ היעד בפורמט הנכון
const TELEGRAM_TOKEN = "8140239961:AAG00jz9mBFsdr_eykcVfZIYSaw0iB94Sc4"; // עדכן כאן את טוקן הטלגרם שלך

// התחברות לוואטסאפ
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  console.log("📱 סרוק את הקוד עם וואטסאפ:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ וואטסאפ מחובר!");
});

// התחברות לטלגרם
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) {
    bot.sendMessage(chatId, "❌ רק הודעות טקסט נתמכות.");
    return;
  }

  try {
    await client.sendMessage(TARGET_PHONE, text);
    bot.sendMessage(chatId, "✅ ההודעה התקבלה ותישלח מיד לוואטסאפ.");
    console.log(`📤 שלח הודעה לוואטסאפ: ${text}`);
  } catch (err) {
    console.error("❌ שגיאה בשליחת הודעה לוואטסאפ:", err);
    bot.sendMessage(chatId, "❌ קרתה שגיאה בשליחת ההודעה.");
  }
});

// הפעלת הלקוח של וואטסאפ
client.initialize();
