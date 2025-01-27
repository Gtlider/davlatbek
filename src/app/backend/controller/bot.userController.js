// Foydalanuvchi ma'lumotlarini saqlash yoki yangilash
const User = require("../models/bot.userModel")
async function saveOrUpdateUser(msg) {
    try {
        const { id: userId, username, first_name: firstName, last_name: lastName } = msg.from;

        let user = await User.findOne({ userId });

        if (!user) {
            user = new User({
                userId,
                username,
                firstName,
                lastName,
            });
        }

        await user.save();

        console.log("Foydalanuvchi muvaffaqiyatli saqlandi/yangi qilindi");
    } catch (err) {
        console.error("Foydalanuvchini saqlashda xato:", err);
    }
}

module.exports = { saveOrUpdateUser };