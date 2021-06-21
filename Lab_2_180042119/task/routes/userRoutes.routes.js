const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/login',(req, res) => {
    res.sendFile("login.html", { root:  "./views/pages/examples" });
  })

  router.get('/register',(req, res) => {
    res.sendFile("register.html", { root:  "./views/pages/examples" });
  })

module.exports = router;
