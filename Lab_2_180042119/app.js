const express = require('express')
const app=express()

app.get('/', (req,res)=>{
    res.status(201).send("<h1>hi</h1>")
    })
   


module.exports=app