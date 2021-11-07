const Food = require('../models/Food')
const cartModel = require('../models/Cart');
const jwt = require('jsonwebtoken');
const orderModel = require('../models/Order');
const { multipleMongooseToObject } = require('../../resource/util/mongoose');
const { updateOne } = require('../models/Food');
const Usr = require('../models/User')


class SiteController {
    home(req, res, next) {
        Food.find({}).sort({_id: -1}).limit(4)
            .then(foods => {
                res.render('home', {
                    foods: multipleMongooseToObject(foods)
                })
            })
            .catch(next)
    }

    showabout(req, res) {
        res.render('about')
    }

    showcontact(req, res) {
        res.render('contact')
    }

    showmenu(req, res, next) {
        Food.find({})
            .then(foods => {
                res.render('menu', {
                    foods: multipleMongooseToObject(foods)
                })
            })
            .catch(next)
    }

    history(req, res, next) {
        var token = req.cookies.token;
        var User = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        orderModel.find({phone: User.phone})
            .then(order => {
                    res.render('history', {
                        order: multipleMongooseToObject(order),
                       
                    })
                })
    }

    addToCart(req, res, next) {
        var token = req.cookies.token;
        var User = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        var data = req.body;
        var codeFood = data.code;
        var num = data.number;
        
        cartModel.findOne({ phone: User.phone, })
            .then(cart => {
                console.log("start");
                var consCart = cart.cart;
                console.log(consCart);
                let itemCode = Object.keys(cart.cart);
                var exist = false;
                for (let i = 0; i < itemCode.length; i++) {
                    if (itemCode[i] == codeFood) {
                        consCart[codeFood].number = num;
                        exist = true;
                    }
                }
                if (!exist) {
                    consCart[codeFood] = {
                        "number": num,
                    }
                }
                return consCart;
            })
            .then(consCart => {
                cartModel.deleteOne({ phone: User.phone })
                    .then(() => {
                        var newCart = {};
                        newCart.phone = User.phone;
                        newCart.cart = consCart;
                        const SaveCart = new cartModel(newCart);
                        SaveCart.save();

                    });
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = new SiteController;