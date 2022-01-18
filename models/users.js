const mongoose = require("mongoose");
const {Schema} = mongoose;

const usersSchema = new Schema(
    {
       caloriesTarget: { type: Number },
       fname: String,
       lname: String,
    },
    { timestamps: true}

);

module.exports = mongoose.model("users", usersSchema);