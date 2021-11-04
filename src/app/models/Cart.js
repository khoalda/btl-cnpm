
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cart = new Schema({
    phone: {type: String},
    cart: {type: Object, default: {}}
},{minimize: false})

module.exports = mongoose.model('Cart', Cart)