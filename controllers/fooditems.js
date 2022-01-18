const Fooditems = require("../models/Fooditems");

exports.list = async (req, res) => {
    try {
        console.log(req, query)
        const fooditems = await fooditems.find({});
        res.render("fooditems", {fooditems: fooditems, message: message});

    } catch (e) {
        res.status(404).send({ message: "could not list food items"});

    }

};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Fooditems.findByIdAndRemove(id);
        res.redirect("/fooditems")
    }catch (e) {
        res.status(404).send({
            message: 'could not delete ${id}.'
        });
    }

};