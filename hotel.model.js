const { default: mongoose } = require("mongoose");
const User = require("./user.model");

const HotelSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        uppercase: true,
        maxlength: 5,
        minlength: 5
    },
    name: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
})

const Hotel = mongoose.model("Hotel", HotelSchema)

module.exports = Hotel;