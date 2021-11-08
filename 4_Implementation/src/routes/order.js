const express = require('express')
const router = express.Router()

const orderController = require('../app/controllers/OrderController')

router.get('/create', orderController.create)
router.get('/:id/update', orderController.update)
router.put('/:id', orderController.edit)
router.delete('/:id/delete', orderController.delete)
router.post('/store', orderController.store)
router.get('/', orderController.index)


module.exports = router