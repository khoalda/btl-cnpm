const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')


router.get('/', userController.user)
router.delete('/:id/delete', userController.delete)


module.exports = router