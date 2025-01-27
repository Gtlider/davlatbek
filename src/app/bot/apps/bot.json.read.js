module.exports = async (bot,msg,jsonData) => {
    const keys = Object.keys(jsonData);
    const response = keys.map(key => `${key}: <code>${jsonData[key]}</code>`).join("\n");
    bot.sendMessage(msg.chat.id, `\u2709\uFE0F\n\n${response}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "O'chirish", callback_data: "delete" }]
            ]
        },
        parse_mode: "HTML"
    });
    
    bot.deleteMessage(msg.chat.id, msg.message_id)

    bot.on("callback_query", (callbackQuery) => {        
        if (callbackQuery.data === "delete") {
            bot.answerCallbackQuery(callbackQuery.id, { text: "Rahmat!" });
            bot.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
        }
    });
}