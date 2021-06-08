const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    // const id=req.query.id;
    // const name=req.query.name;

    const {id,name}=req.query
     res.send(id+"  "+name+" says hi")
    // res.sendFile("login.html", { root: "./views/users" });
});

router.get("/dashboard/:id/:name",(req, res)=>{
    const {id,name}=req.params
res.send("id: "+id+" username: "+name+" says hi");
})

router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "./views/users" });
});

module.exports = router;
