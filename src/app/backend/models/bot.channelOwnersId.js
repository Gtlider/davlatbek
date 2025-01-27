const mongoose = require("mongoose");

const ChannelInfoSchema = new mongoose.Schema({
    channelId: { type: String, required: true, unique: true },
    adminIds: { type: [String], required: true }, // Barcha adminlarning IDlari
});

const ChannelInfo = mongoose.model("ChannelInfo", ChannelInfoSchema)
module.exports=ChannelInfo;
