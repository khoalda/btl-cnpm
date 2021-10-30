const menuRouter = require('./menu');
const siteRouter = require('./site');

function route(app) {

  app.use('/menu', menuRouter);

  app.use('/', siteRouter);

}

module.exports = route;
