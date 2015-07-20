var User = require('../models/user'),
    jwt = require('jwt-simple'),
    config = require('../config'),
    service = require('../services/token');
    handleError = require('../services/error');

exports.index = function(req,res){
  res.status(200).send({message:'yo soy una prueba que solo puedo ser vista si estas autenticado'});
};

exports.login = function(req,res){
  var credetials = {
    email : req.body.email,
    password: req.body.password
  };
  if(!credetials.email) return res.status(400).send({
    message : 'Error al iniciar Sesión, intentalo nuevamente'
  });
  User.findOne({'email':credetials.email},function(err,user){
    if(user)
      if(user.validPassword(credetials.password))
        res.status(200).json({'token':service.createToken(user)});
        else
        res.status(400).send({message:'Contraseña Incorrecta'});
    else
      res.status(400).send({message: 'Email no encontrado, Registrate!'});
  });
};

exports.registro = function(req,res){
  var credetials = {
    email : req.body.email,
    password: req.body.password
  };
  if(!credetials.email) return res.status(400).send({
    message : 'Error al Registrarte, intentalo nuevamente'
  });
  var user = new User(credetials);
  user.save(function(err,data){
    if(err)
      return res.status(400).send({
        message: handleError.getErrorMessage(err)
      });
    res.status(201).json({'token':service.createToken(user)});
  });
};

exports.find = function(req,res){
  User.find(function(err,user){
    if(err)
      return res.status(400).send({
        message: handleError.getErrorMessage(err)
      });
    res.status(200).json(user);
  });
};

exports.profile = function(req,res){
  var id = req.user;
  User.findOne({_id:id},function(err,user){
    if(err)
      return res.status(400).send({
        message: handleError.getErrorMessage(err)
      });
    res.status(200).json(user);
  });
}


