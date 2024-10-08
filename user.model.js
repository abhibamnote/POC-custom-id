const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        uppercase: true,
        maxlength: 10,
        minlength: 10,
        sparse: true
    },
    email: {
        type: String,
        unique: true
    },
    pass: {
        type: String
    },
    hotelId: {
        type: String
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User;