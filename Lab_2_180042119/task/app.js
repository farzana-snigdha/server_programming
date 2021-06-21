const express = require("express");
const cors = require('cors')
const userRoutes = require("./routes/userRoutes.routes");

const app = express();
app.use(express.json({extende:false}))
app.use(cors())
app.use(express.static("public"));

app.use((req, res) => {
    res.status(401).send("<h1>page not found</h1>");
  });

module.exports=app