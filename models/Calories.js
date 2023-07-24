const mongoose = require("mongoose");
const {Schema} = mongoose;

const caloriesSchema = new Schema(
    {
        gender: { type: Number },
       age: { type: Number },
       height: { type: Number },
       weight: { type: Number },
    },
    { timestamps: true}

);

module.exports = mongoose.model("Calories", caloriesSchema);