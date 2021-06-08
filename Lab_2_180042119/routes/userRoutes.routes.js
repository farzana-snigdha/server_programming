const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const isLoggedIn=require('./../middlewares/auth.middleware')

//to read data from body, always do the same thing
router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json())

router.get("/login", (req, res) => {
  // const id=req.query.id;
  // const name=req.query.name;

  const { id, name } = req.query;
  res.send(id + "  " + name + " says hi");
  // res.sendFile("login.html", { root: "./views/users" });
});

router.get("/dashboard", (req, res) => {
  // const { id, name } = req.params;
  res.send("user Dashboard");
});

router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "./views/users" });
});

router.post("/register",isLoggedIn, (req, res) => {
  //  const name=req.body.uname;
  //  const email=req.body.mail
  //  const password=req.body.psw  //psw came from html : name

  //  res.send("email: " + email + ", username: " + name +", password: " + password + " says hi")
  //   // res.sendFile("register.html", { root: "./views/users" });

  res.redirect('/users/dashboard')
  });


module.exports = router;
