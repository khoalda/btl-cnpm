const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
class Authenticate{
    isLoggedIn(req, res, next){
        try
        {   
           
            var token = req.cookies.token;
            if(typeof token==="undefined") res.redirect("/login");
            var idUser = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            userModel.findOne({_id: idUser})
            .then(data=>{
                console.log(data);
                if(data){
                    next();
                }
                else
                {
                    res.redirect("/login");
                }
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }

    checkAdmin(req,res,next)
    {
        var role = req.data.role;
        if(role == "admin"){
            next();
        }
        else
        {
            res.redirect("/");
        }
    }

    checkClerk(req,res,next)
    {
        var role = req.data.role;
        if(role == "clerk"){
            next();
        }
        else
        {
            res.redirect("/");
        }
    }
    
}

module.exports = new Authenticate