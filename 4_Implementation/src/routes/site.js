const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')
const authController = require('../app/middlewares/auth');

router.get('/history', siteController.history)
router.get('/about', siteController.showabout)
router.get('/menu', siteController.showmenu)
router.post('/menu',siteController.addToCart);
router.get('/contact', siteController.showcontact)
router.get('/:slug', siteController.showcontact)
router.get('/', siteController.home)

module.exports = router;