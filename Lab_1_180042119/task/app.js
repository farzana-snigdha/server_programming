const express = require('express');
const app = express();
const port = 3000; // Choose your desired port
const routes= require("./routes")

const server=require("./routes")
app.use(server)

const {logRequest}=require("./middleware")
app.get("/middleware",logRequest,(req,res)=>{
    res.send("We have implemented our first middleware!!")
})

app.use(routes)
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});