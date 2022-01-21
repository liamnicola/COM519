const Fooditems = require("../models/Fooditems");



exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const fooditems = await Fooditems.find({});
        res.render("fooditems", {fooditems: fooditems, message: message});

    } catch (e) {
        res.status(404).send({ message: "could not list food items"});

    }

};

exports.create = async (req, res) => {
    try {
        const fooditems = new Fooditems({ foodName: req.body.foodName, calories: req.body.calories, carbs: req.body.carbs, fats: req.body.fats, protein: req.body.protein });
        await fooditems.save();
        res.redirect('/fooditems')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('create-fooditem', { errors: e.errors })
            return;
          }
          return res.status(400).send({
            message: JSON.parse(e),
          });
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

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
      const fooditems = await Fooditems.findById(id);
      res.render('update-fooditem', { fooditems: fooditems, id: id });
    } catch (e) {
      res.status(404).send({
        message: `could not find fooditem${id}.`,
      });
    }
  };

  exports.update = async (req, res) => {
    const id = req.params.id;
    try {
      const fooditems = await Fooditems.updateOne({ _id: id }, req.body);
      res.redirect('/fooditems');
    } catch (e) {
      res.status(404).send({
        message: `could find food item ${id}.`,
      });
    }
  };

  exports.count = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const fooditems = await Fooditems.find({count});
        res.render("fooditems", {fooditems: fooditems, message: message});

    } catch (e) {
        res.status(404).send({ message: "could not list food items"});

    }

};
  