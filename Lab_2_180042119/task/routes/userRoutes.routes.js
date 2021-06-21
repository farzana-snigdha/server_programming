const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { getRegister, getLogin,postRegister,postLogin,getDashboard } = require("../../task/controllers/userController.controllers");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/login',getLogin)
router.post('/login',postLogin)
  router.get('/register',getRegister)
router.post('/register',postRegister)

router.get('/dashboard',getDashboard)
module.exports = router;
