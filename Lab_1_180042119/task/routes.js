const express = require("express");
const router = express.Router();
const {getUserID} = require("./controller")

router.get("/view", (req,res)=>{
    res.send("<h1>hello</h1>")
});

// router.get('/users/:id', (req, res) => {
//     const userId = req.params.id;
//     // Use the userId to fetch user data or perform some action
//     res.send(`User ID: ${userId}`);
//   } );


router.get('/users/:id', getUserID );

module.exports = router;