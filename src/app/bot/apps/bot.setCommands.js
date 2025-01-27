
const Command = require("../../backend/models/bot.Commands");
module.exports = async (bot) => {
    try {
        const existingCommands = await bot.getMyCommands(); // Hozirgi komandalarni olamiz
        const commands = await Command.find();
        const botCommands = commands.map(cmd => ({
            command: cmd.name, 
            description: cmd.title
        }));

        const newCommands = botCommands.filter(cmd => 
            !existingCommands.some(exCmd => 
                exCmd.command === cmd.command && exCmd.description === cmd.description
            )
        );

        if (newCommands.length > 0) {
            await bot.setMyCommands(botCommands);
            console.log("Bot komandalar muvaffaqiyatli o'rnatildi:", newCommands);
        } else {
            console.log("Yangi komanda yo'q, mavjud komandalar ishlatilmoqda.");
        }
    } catch (err) {
        console.error("Bot komandalarini o'rnatishda xato:", err);
    }
};
