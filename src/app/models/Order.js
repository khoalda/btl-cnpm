const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    phone: {type: String},
    order: {type: Object},
    date: {type: String},
    total: {type: String},
})

module.exports = mongoose.model('Order', Order)