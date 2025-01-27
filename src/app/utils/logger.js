const fs = require("fs").promises;

async function logMessage(msg) {
    try {
        const log = `[${new Date().toISOString()}] ${msg.from.username || msg.from.id}: ${msg.text}\n`;
        await fs.appendFile("message_logs.txt", log);
    } catch (error) {
        console.error("Log yozishda xato:", error);
    }
}
