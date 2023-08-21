const express = require('express');
const app = express();
const port = 3000; // Choose your desired port

const server=require("./routes")
app.use(server)

const {logRequest}=require("./middleware")
app.get("/middleware",logRequest,(req,res)=>{
    res.send("We have implemented our first middleware!!")
})

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Use the userId to fetch user data or perform some action
    res.send(`User ID: ${userId}`);
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});