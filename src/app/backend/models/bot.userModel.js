// src/app/backend/models/bot.userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
