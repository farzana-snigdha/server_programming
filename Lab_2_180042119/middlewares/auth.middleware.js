const isLoggedin=(req,res,next)=>{
    const name=req.body.uname;
     const email=req.body.mail
     const password=req.body.psw  //psw came from html : name

     if(name=='admin'){
         next();
     }
else{
    res.redirect("/users/register")
}}

module.exports=isLoggedin