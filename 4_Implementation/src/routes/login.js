const express = require('express')
const router = express.Router()

const loginController = require('../app/controllers/LoginController')
router.post('/', loginController.signin)
router.get('/:slug', loginController.index)

router.get('/', loginController.index)


module.exports = router