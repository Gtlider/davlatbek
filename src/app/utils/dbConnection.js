const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI);
        console.log("MongoDB muvaffaqiyatli ulandi!");
    } catch (err) {
        console.error("MongoDB ulanishda xato:", err);
        throw err; // Jarayonni chaqirgan yerda ushlash uchun xatoni tashlash
    }
};

module.exports = connectDB;
