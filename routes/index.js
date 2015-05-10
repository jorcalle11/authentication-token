var controller = require('../controllers/ctrl.user');

module.exports =function(app){
  app.post('/signup',controller.signup);
  app.post('/signin',controller.signin);
  app.get('/home',controller.athenticated, controller.index);
  app.get('/find',controller.find);
};

