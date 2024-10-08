const { default: mongoose } = require("mongoose");
const Hotel = require("./hotel.model");

const FoodSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        uppercase: true,
        maxlength: 10,
        minlength: 10,
    },
    name: {
        type: String
    },
    hotel: {
        type: String
    }
})

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;