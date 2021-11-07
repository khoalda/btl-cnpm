require('dotenv').config();
var session = require('express-session')
var bodyParser = require("body-parser")
const User = require('../models/User')
const jwt = require('jsonwebtoken')

class LoginController {

    // GET method
    index(req, res) {
        var token = req.cookies.token;
        if(typeof token !== "undefined"){
            res.redirect("/account");
        }
        else
        {
            res.render("login");
        }
    }
    // POST login method
    signin(req, res) {
        var phone = req.body.phone
        var password = req.body.password
        console.log(phone)
        console.log(password)
        if (phone && password) {
            User.findOne({ phone: phone, password: password }).
                then(data => {
                    console.log(data);
                    if (data) {
                        var token = jwt.sign({
                            _id: data._id,
                            phone: data.phone,
                        }, process.env.ACCESS_TOKEN_SECRET);
                        console.log(token);
                        res.cookie("token",token);
                        if (data.role == 'admin')
                            res.redirect("/account");
                        else res.redirect("/");
                    }
                    else {
                        res.redirect("/login");
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json('Server Error');
                });

        }
        else {
            res.redirect("/login");
        }
    }
}

module.exports = new LoginController