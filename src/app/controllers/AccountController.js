const Food = require('../models/Food')
const cartModel = require('../models/Cart');
const jwt = require('jsonwebtoken');
const orderModel = require('../models/Order');
const { multipleMongooseToObject } = require('../../resource/util/mongoose');
const { updateOne } = require('../models/Food');
const User = require('../models/User')
class AccountController {
    index(req, res){
        var token = jwt.decode(req.cookies.token)
        console.log(token)
        if(token == null){
            res.redirect("/");
        }
        else{
            var phone = token.phone
            User.findOne({ phone: phone}).
            then(data => {                
                if (data) {
                    console.log(data);
                    if (data.role != 'admin'){
                        res.render('account')
                    }
                    else {
                        res.render('admin_account')
                    }
                }

            })
            .catch(err => {
                console.log(err);
                res.status(500).json('Server Error');
            });

        }
    }
    
}

module.exports = new AccountController