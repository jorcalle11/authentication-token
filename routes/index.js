var controller = require('../controllers/ctrl.user');

module.exports =function(app){
  app.get('/home',controller.index);
  app.post('/signup',controller.signup);
  app.post('/signin',controller.signin);
  //app.get('/private',controller.authenticated, controller.restring);
};

