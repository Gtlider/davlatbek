<<<<<<< HEAD
const fs = require("fs").promises;

async function logMessage(msg) {
    try {
        const log = `[${new Date().toISOString()}] ${msg.from.username || msg.from.id}: ${msg.text}\n`;
        await fs.appendFile("message_logs.txt", log);
    } catch (error) {
        console.error("Log yozishda xato:", error);
    }
}
=======
// src/app/utils/logger.js
const fs = require("fs");

function logMessage(msg) {
    const log = `[${new Date().toISOString()}] ${msg.from.username}:[${msg.from.id}] ${msg.text}\n`;
    fs.appendFileSync("message_logs.txt", log);
    console.log(log);
}

module.exports = { logMessage };
>>>>>>> 4ff9c4d4a18563fd0147c23ee178b8252bf25ece
