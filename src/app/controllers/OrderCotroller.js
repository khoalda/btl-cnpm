const Food = require('../models/Food')
const {multi, mongooseToObject} = require('../../util/mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
class OrderController {

    //GET method
    index(req, res, next){
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
                        Food.find({})
                        .then(food => res.render('order', {
                            food: multi(food)
                        })) 
                        .catch(next)
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

module.exports = new OrderController