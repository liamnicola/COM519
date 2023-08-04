require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/User");
const md5 = require("md5");
const app = express();
app.set("view engine", "ejs");


const { PORT, MONGODB_URI } = process.env;


const fooditemsController = require("./controllers/fooditems");
const logController = require("./controllers/log");
const userController = require("./controllers/user");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))
app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

global.user = false;
app.use("*", async (req, res, next) => {
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
    console.log(user)
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}


app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/", (req, res) => {
  res.render("landing");
});


app.get("/home", (req, res) => {
  let calories = 0
  res.render("index", {calories});
});

//res.send("Calorie Goal is:" + calories.toFixed(0))

app.post("/home", function(req, res){
  let calories = 0
  console.log(req.body.radio)
  if(req.body.gender == 'Female') {
    //females  
calories = 655.09 + (9.56 * req.body.weight) + (1.84 * req.body.height) - (4.67 * req.body.age);
}  else {
    //males
calories = 66.47 + (13.75 * req.body.weight) + (5 * req.body.height) - (6.75 * req.body.age);
}

if(req.body.radio == "1"){
  calories= 1.2 * calories
} else if(req.body.radio == "2"){
  calories= 1.55 * calories
} else if(req.body.radio == "3"){
  calories= 1.7 * calories
} else {
  calories = calories
}

calories = calories.toFixed(0)
res.render("index", {calories})
});


app.get("/create-fooditem", authMiddleware, (req, res) => {
  res.render("create-fooditem", { errors: {} });
});

app.post("/create-fooditem", fooditemsController.create);

app.get("/fooditems", fooditemsController.list);
app.get("/fooditems/delete/:id", fooditemsController.delete);
app.get("/fooditems/update/:id", fooditemsController.edit);
app.post("/fooditems/update/:id", fooditemsController.update);

app.post("/add-to-log", fooditemsController.addToLog);

app.get("/daily", logController.list)

app.get("/join", (req, res) => {
  res.render('create-user', { errors: {} })
});

app.post("/join", userController.create);
app.get("/login", (req, res) => {
  res.render('login-user', { errors: {} })
});
app.post("/login", userController.login);

app.get("/create-fooditem", authMiddleware, (req, res) => {
  res.render("create-fooditem", { errors: {} });
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
  );
  process.exit();
});

app.listen(PORT, () => {
    console.log(
      `Example app listening at http://localhost:${PORT}`,
    );
  });

