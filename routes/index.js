var auth = require('../controllers/auth');
var authorization = require('../services/authorization');

module.exports =function(app){
	app.get('/',function(req,res){
		res.status(200).json({message:'hola mundo!!'});
	});
  app.post('/registrate',auth.registro);
  app.post('/login',auth.login);
  app.get('/find',auth.find);
  app.get('/home',authorization.isLogged, auth.index);
  app.get('/me', authorization.isLogged, auth.profile);
};

