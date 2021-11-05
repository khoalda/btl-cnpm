const Food = require('../models/Food')
const cartModel = require('../models/Cart');
const jwt = require('jsonwebtoken');
const orderModel = require('../models/Order');
const { multipleMongooseToObject } = require('../../resource/util/mongoose');
const { updateOne } = require('../models/Food');
const User = require('../models/User')



class UserController {
    user(req, res, next) {
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
                        res.redirect("/");
                    }
                    else {
                        User.find({role: "customer"})
                        .then(user => res.render('userManagement', {
                            user: multipleMongooseToObject(user)
                        }))
                    }
                }

            })
            .catch(err => {
                console.log(err);
                res.status(500).json('Server Error');
            });

        }
    }

    delete(req, res, next){
        User.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/user'))
            .catch(error => {

            })
    }
}

module.exports = new UserController;