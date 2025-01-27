const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    addedAt: { type: Date, default: Date.now },
});

const Blacklist = mongoose.model("Blacklist", BlacklistSchema);
module.exports=Blacklist