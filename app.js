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
const userController = require("./controllers/user");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

global.user = false;
app.use("*", async (req, res, next) => {
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
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
    res.render("index.ejs");
});

app.get("/index", (req, res) => {
  res.render("index.ejs");
});

app.get("/create-fooditem", (req, res) => {
  res.render("create-fooditem", { errors: {} });
});

app.post("/create-fooditem", fooditemsController.create);

app.get("/fooditems", fooditemsController.list);
app.get("/fooditems/delete/:id", fooditemsController.delete);
app.get("/fooditems/update/:id", fooditemsController.edit);
app.post("/fooditems/update/:id", fooditemsController.update);

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


