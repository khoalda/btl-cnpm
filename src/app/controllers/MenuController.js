class MenuController {
    //[GET] /news
    index(req, res) {
        res.render('menu');
    }

    //[GET] /news/:slug
    show(req, res) {
        res.send('Menu details !!!');
    }
}

module.exports = new MenuController;