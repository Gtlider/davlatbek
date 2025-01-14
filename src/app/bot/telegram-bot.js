// src/app/bot/telegram-bot.js
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const adminFunctions = require("./messages/admin.js");
const userFunctions = require("./messages/user.js");
const trackUser = require("./messages/tracker.js");
const readJson = require("../bot/apps/bot.json.read.js")
const { logMessage } = require("../utils/logger.js");

dotenv.config();
mongoose.connect(process.env.MONGO_URI,)
    .then(() => console.log("MongoDB muvaffaqiyatli ulandi!"))
    .catch((err) => console.error("MongoDB ulanishda xato:", err));
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    logMessage(msg); // Xabarni diagnostika yoki tahlil qilish uchun loglash

    
    trackUser(msg);

    try {
        if (msg.text && isValidJson(msg.text)) {
            const jsonData = JSON.parse(msg.text);

            // JSON obyektining mavjud elementlarini aniqlash va formatlash
            readJson(bot,msg,jsonData)

        } else if (msg.from.id == process.env.ADMIN_ID) {
            adminFunctions(bot, msg);
        } else {
            userFunctions(bot, msg);
        }
    } catch (error) {
        console.error("Xabarni qayta ishlashda xato:", error);
    }
});

function isValidJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}
console.log("Bot muvaffaqiyatli ishga tushdi!");
module.exports = bot;