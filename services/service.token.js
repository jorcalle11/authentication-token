var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/config');

module.exports.createToken = function(user){
  var payload = {
    sub: user._id,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix()
  };
  return jwt.encode(payload,config.secret);
}
