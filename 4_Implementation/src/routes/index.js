const orderRouter = require('./order')
const siteRouter = require('./site')
const loginRouter = require('./login')
const cartRouter = require('./cart');
const registerRouter = require('./register');
const accountRouter = require('./account')
const userRouter = require('./user')

function route(app){
    app.use('/user', userRouter)
    app.use('/order', orderRouter)
    app.use('/login', loginRouter)    
    app.use('/register', registerRouter)
    app.use('/cart',cartRouter)
    app.use('/account',accountRouter);
    app.get('/:slug', siteRouter)
    app.use('/', siteRouter)
}

module.exports = route