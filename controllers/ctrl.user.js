var User = require('../models/model.user'),
    service = require('../services/service.token');

module.exports.index = function(req,res){
  res.status(200).send({message:'yo soy una prueba'});
};

module.exports.signin = function(req,res){

};

module.exports.signup = function(req,res){
  var user = new User(req.body);
  
  user.save(function(err,data){
    if(!err){
      console.log(data);
      var token = service.createToken(data);
      console.log(token);
      res.status(200).send({token: token});
    };
  });
};
