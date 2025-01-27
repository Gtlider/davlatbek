const ChannelInfo = require("../models/bot.channelOwnersId"); // Kanal ma'lumotlari
const Blacklist = require("../models/bot.blacklist"); // Qora ro'yxat modeli

async function checkChannel(bot, msg) {
    try {
        const channelId = msg.chat.id;
        const postLink = await generatePostLink(bot, msg);

        async function generatePostLink(bot, msg) {
            if (msg.chat.username) {
                return `https://t.me/${msg.chat.username}/${msg.message_id}`;
            } else {
                try {
                    const inviteLink = await bot.exportChatInviteLink(msg.chat.id);
                    return `${inviteLink}/${msg.message_id}`;
                } catch (error) {
                    console.error("Taklif havolasini olishda xatolik:", error);
                    return `https://t.me/c/${String(msg.chat.id).replace('-100', '')}/${msg.message_id}`;
                }
            }
        }

        // Kanalning barcha administratorlarini olish
        const admins = await bot.getChatAdministrators(channelId);

        // Barcha administratorlarning IDlarini olish
        const adminIds = admins.map((admin) => admin.user.id);

        // Ma'lumotlar bazasida kanalni tekshirish
        let channel = await ChannelInfo.findOne({ channelId: channelId });

        if (!channel) {
            // Yangi kanalni bazaga qo'shish
            const newChannel = new ChannelInfo({
                channelId: channelId,
                adminIds: adminIds, // Barcha admin IDlari
            });
            await newChannel.save();
            console.log("Yangi kanal qo'shildi:", channelId);
        } else {
            // Har bir admin uchun uning adminlik qiladigan barcha kanallarni topish
            for (const adminId of adminIds) {
                // Blacklistdan tekshirish
                const isBlacklisted = await Blacklist.findOne({ userId: adminId });
                if (isBlacklisted) {
                    console.log(`Admin ID ${adminId} qora ro'yxatda, xabar yuborilmadi.`);
                    continue;
                }

                // Adminlik qiladigan barcha kanallarni olish
                const adminChannels = await ChannelInfo.find({ adminIds: adminId });

                for (const adminChannel of adminChannels) {
                    try {
                        await bot.sendMessage(
                            adminChannel.channelId,
                            `Yangi post qo'shildi: ${postLink}`
                        );
                    } catch (error) {
                        if (
                            error.response &&
                            error.response.body &&
                            error.response.body.description.includes("bots can't send messages to bots")
                        ) {
                            console.error(`Admin ID ${adminId} qora ro'yxatga qo'shildi.`);
                            // Qora ro'yxatga qo'shish
                            const newBlacklist = new Blacklist({ userId: adminId });
                            await newBlacklist.save();

                            // Adminni ChannelInfo'dan o'chirish
                            await ChannelInfo.updateOne(
                                { channelId: adminChannel.channelId },
                                { $pull: { adminIds: adminId } }
                            );
                        } else {
                            console.error(`Xabarni yuborishda boshqa xatolik:`, error);
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    }
}

module.exports = { checkChannel };
