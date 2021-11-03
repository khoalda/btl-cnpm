const Food = require('../models/Food')
const cartModel = require('../models/Cart');
const orderModel = require('../models/Order');

class SiteController {
    //[GET] /
    index(req, res) {
        res.render('home');
    }

    //[GET] /search
    showabout(req, res) {
        res.render('about')
    }
    showcontact(req, res) {
        res.render('contact')
    }

    showmenu(req, res) {
        res.render('menu')
    }

    history(req, res, next) {
        res.render('history')
    }
}

module.exports = new SiteController;