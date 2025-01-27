<<<<<<< HEAD
const TelegramBot = require("node-telegram-bot-api");
=======
// src/app/bot/telegram-bot.js
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
>>>>>>> 4ff9c4d4a18563fd0147c23ee178b8252bf25ece
const dotenv = require("dotenv");
const adminFunctions = require("./messages/admin.js");
const userFunctions = require("./messages/user.js");
const trackUser = require("./messages/tracker.js");
const readJson = require("../bot/apps/bot.json.read.js")
const { logMessage } = require("../utils/logger.js");
<<<<<<< HEAD
const setBotCommands = require("../bot/apps/bot.setCommands.js")
const connectDB = require("../utils/dbConnection.js");
const { checkChannel } = require("../backend/controller/bot.checkChannel");


dotenv.config();
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
(async () => {
    try {
        await connectDB();
    } catch (err) {
        console.error("MongoDB ulanishda xato:", err);
        process.exit(1); 
    }
})();


setBotCommands(bot);
bot.on("polling_error", (e) =>{
    console.log(e);    
})
bot.on("message", (msg) => {
    logMessage(msg); // Xabarni diagnostika yoki tahlil qilish uchun loglash
=======

dotenv.config();
mongoose.connect(process.env.MONGO_URI,)
    .then(() => console.log("MongoDB muvaffaqiyatli ulandi!"))
    .catch((err) => console.error("MongoDB ulanishda xato:", err));
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    logMessage(msg); // Xabarni diagnostika yoki tahlil qilish uchun loglash

    
>>>>>>> 4ff9c4d4a18563fd0147c23ee178b8252bf25ece
    trackUser(msg);

    try {
        if (msg.text && isValidJson(msg.text)) {
            const jsonData = JSON.parse(msg.text);
<<<<<<< HEAD
=======

            // JSON obyektining mavjud elementlarini aniqlash va formatlash
>>>>>>> 4ff9c4d4a18563fd0147c23ee178b8252bf25ece
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
<<<<<<< HEAD
bot.on("channel_post", async (msg) => {
    console.log(msg);  
    // return
    
    await checkChannel(bot, msg);
});
function isValidJson(str) {
    try {
        const parsed = JSON.parse(str);
        return typeof parsed === "object" && !Array.isArray(parsed) && parsed !== null;
=======

function isValidJson(str) {
    try {
        JSON.parse(str);
        return true;
>>>>>>> 4ff9c4d4a18563fd0147c23ee178b8252bf25ece
    } catch (e) {
        return false;
    }
}
console.log("Bot muvaffaqiyatli ishga tushdi!");
module.exports = bot;