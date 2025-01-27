// src/app/backend/models/bot.Commands.js
const mongoose = require("mongoose");

const botCommands = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true, }
});

const Command = mongoose.model("Command", botCommands);
module.exports = Command;
