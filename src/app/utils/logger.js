// src/app/utils/logger.js
const fs = require("fs");

function logMessage(msg) {
    const log = `[${new Date().toISOString()}] ${msg.from.username}:[${msg.from.id}] ${msg.text}\n`;
    fs.appendFileSync("message_logs.txt", log);
    console.log(log);
}

module.exports = { logMessage };
