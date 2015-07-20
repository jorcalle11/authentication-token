var jwt = require('jwt-simple')
module.exports.isLogged = function(req,res,next){
  // en la cabecera la autorizacion es Bearer token;
  if(!req.headers.authorization)
    return res.status(403).send({message:'tu peticion no tiene cabecera de autorizacion'})

  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token,require('../config').secret);
  console.log(payload);
  req.user = payload.sub;
  next();
}
