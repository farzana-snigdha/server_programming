const MathOlympiad=require('../models/MathOlympiad.models')
 
const getMO= (req,res)=>{
    res.render('math-olympiad/register.ejs')
}

const postMO= (req,res)=>{
    const{name,category,contact,email,institution,tshirt}=req.body
    console.log(institution)
  
    res.render('math-olympiad/register.ejs')
}

const getMOList= (req,res)=>{
    res.render('math-olympiad/list.ejs')
}
const deleteMO= (req,res)=>{
    const id=req.params.id
    console.log('id ',id)
    // res.render('math-olympiad/register.ejs')
}

module.exports={getMO,postMO,getMOList,deleteMO}
