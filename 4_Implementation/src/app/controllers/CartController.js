const foodModel = require('../models/Food');
const cartModel = require('../models/Cart');
const orderModel = require('../models/Order');
const jwt = require("jsonwebtoken");
const {multi, mongooseToObject} = require('../../util/mongoose')
class CartController {

    index(req, res, next) {
        var token = req.cookies.token;
        var User = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        cartModel.findOne({ phone: User.phone, })
            .then(cart => {
                let SumTotal = 0;
                let listItem = [];


                let itemCode = Object.keys(cart.cart);

                for (let i = 0; i < itemCode.length; i++) {
                    let itemInfo = {
                        name: "",
                        image: "",
                        price: "",
                        number: "",
                        totalPrice: "",
                    };
                    itemInfo.number = cart.cart[`${itemCode[i]}`].number;
                    foodModel.findOne({ code: itemCode[i] })
                        .then(food => {
                            itemInfo.name = food.name;
                            itemInfo.image = food.image;
                            itemInfo.price = food.price;
                            let pricePerItem = itemInfo.number * itemInfo.price;
                            SumTotal = SumTotal + pricePerItem;
                            itemInfo.totalPrice = pricePerItem;
                            listItem.push(itemInfo);

                        })
                        .catch(err => {

                        })

                }

                setTimeout(function () {
                    res.render('cart', {
                        listItem: listItem,
                        SumTotal: SumTotal
                    });
                }, 1000)

            })
            .catch(err => {
                console.log(err);
            })

    }
    
    order(req, res, next) {
        var token = req.cookies.token;
        var User = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        var order = req.body;
        var orderData = {};
        orderData.phone = User.phone;
        orderData.date = order.date;
        orderData.order = order.order;
        orderData.total = order.total;
        orderData.image = order.image;
        const SaveData = new orderModel(orderData);
        SaveData.save();
        cartModel.deleteOne({ phone: User.phone })
            .then(() => {
                var newCart = {};
                newCart.phone = User.phone;
                newCart.cart = {};
                const SaveCart = new cartModel(newCart);
                SaveCart.save()
                    .then(() =>
                        res.redirect("/")
                    );

            });

    }

}

module.exports = new CartController

