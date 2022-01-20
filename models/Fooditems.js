const mongoose = require("mongoose");
const {Schema} = mongoose;

const fooditemsSchema = new Schema(
    {
       calories: { type: Number },
       carbs: { type: Number },
       fats: { type: Number },
       foodName: String,
       protein: { type: Number },
    },
    { timestamps: true}

);

module.exports = mongoose.model("Fooditems", fooditemsSchema);