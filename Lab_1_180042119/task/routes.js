const express = require("express");
const router = express.Router();

router.get("/view", (req,res)=>{
    res.send("<h1>hello</h1>")
});
module.exports = router;