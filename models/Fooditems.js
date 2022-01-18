const mongoose = require("mongoose");
const {Schema} = mongoose;

const FooditemsSchema = new Schema(
    {
       calories: { type: Number },
       carbs: { type: Number },
       fat: { type: Number },
       foodName: String,
       protein: { type: Number },
    },
    { timestamps: true}

);

module.exports = mongoose.model("fooditems", FooditemsSchema);