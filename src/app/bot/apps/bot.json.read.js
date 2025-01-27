module.exports = async (bot,msg,jsonData) => {
    const keys = Object.keys(jsonData);
    const response = keys.map(key => `${key}: <code>${jsonData[key]}</code>`).join("\n");
<<<<<<< HEAD
    bot.sendMessage(msg.chat.id, `\u2709\uFE0F\n\n${response}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "O'chirish", callback_data: "delete" }]
=======

    bot.sendMessage(msg.chat.id, `\u2709\uFE0F\n\n${response}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Copy Code", callback_data: "delete" }]
>>>>>>> 4ff9c4d4a18563fd0147c23ee178b8252bf25ece
            ]
        },
        parse_mode: "HTML"
    });
<<<<<<< HEAD
    
    bot.deleteMessage(msg.chat.id, msg.message_id)

    bot.on("callback_query", (callbackQuery) => {        
=======


    bot.on("callback_query", (callbackQuery) => {
>>>>>>> 4ff9c4d4a18563fd0147c23ee178b8252bf25ece
        if (callbackQuery.data === "delete") {
            bot.answerCallbackQuery(callbackQuery.id, { text: "Rahmat!" });
            bot.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
        }
    });
}