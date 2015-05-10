var User = require('../models/model.user'),
    jwt = require('jwt-simple'),
    config = require('../config/config'),
    service = require('../services/service.token');

module.exports.index = function(req,res){
  res.status(200).send({message:'yo soy una prueba que solo puedo ser vista si estas autenticado'});
};

module.exports.signin = function(req,res){
  var credetials = req.body;
  User.findOne({'email':credetials.email},function(err,user){
    if(user)
      if(user.validPassword(credetials.password))
        res.status(200).json({'User':user,'Token':service.createToken(user)});
        else
        res.status(400).send({message:'Password invalid'});
    else
      res.status(400).send({message: 'User no found'});
  });
};

module.exports.signup = function(req,res){
  var user = new User(req.body);
  user.save(function(err,data){
    if(!err)
      res.status(200).json({'User':user,'Token':service.createToken(user)});
    else
      res.status(400).send({message:'hubo un error al guardar los datos'});
  });
};


module.exports.find = function(req,res){
  User.find(function(err,data){
    if(!err){
      res.status(200).json(data);
    }
  });
}

module.exports.athenticated = function(req,res,next){
  // en la cabecera la autorizacion es Bearer token;
  if(!req.headers.authorization)
    return res.status(403).send({message:'tu peticion no tiene cabecera de autorizacion'})
  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token,config.secret);
  req.user = payload.sub;
  next();
}
