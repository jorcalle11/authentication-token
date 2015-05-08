var jwt = require('jwt-simple'),
    config = require('../config/config');

module.exports.createToken = function(user){
  var payload = {
    sub: user._id,
    email: user.email,
  };

  return jwt.encode(payload,config.secret);
}
