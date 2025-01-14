// src/app/bot/messages/tracker.js
const { saveOrUpdateUser } = require("../../backend/controller/bot.userController.js");

module.exports = async (msg) => {
    await saveOrUpdateUser(msg);
};
