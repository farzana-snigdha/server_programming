const express = require("express");
const userRoutes=require("./routes/userRoutes.routes");
const app = express();


app.use(userRoutes)
app.get("/", (req, res) => {
  res.status(201).send("<h1>hi</h1>");
});

app.get("/about", (req, res) => {
  res.cookie("username", "asd");
  // res.clearCookie("username")
  res.append("key","boo")
  res.status(201).send("<h1>about</h1>");
});

app.get("/contact", (req, res) => {
    res.json({name:"asd",hobby:"sleep"})
  res.status(201).send("<h1>contact</h1>");
});

app.use((req, res) => {
  res.status(401).send("<h1>page not found</h1>");
});

module.exports = app;
