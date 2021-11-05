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

    create(req, res){
        res.render('create')
    }

    update(req, res, next){
        Food.findById(req.params.id)
            .then(food => res.render('update', {
                food: mongooseToObject(food)
            }))
            .catch(next)
    }

    delete(req, res, next){
        Food.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/order'))
            .catch(error => {

            })
    }

    edit(req, res, next){
        Food.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/order'))
            .catch(error => {

            })
    }

    store(req, res){
        //res.json(req.body)
        const formData = req.body
        const newFood = new Food(formData)
        newFood.save()
            .then(() => res.redirect('/order'))
            .catch(error => {

            })
    }
}

module.exports = new OrderController