var express = require('express');
var router = express.Router();

const menuController = require('../app/controllers/MenuController')

router.use('/:slug', menuController.show)
router.use('/', menuController.index)


module.exports = router;