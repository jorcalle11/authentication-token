var mongoose = require('mongoose'),
    config = require('../config/config');

mongoose.connect(config.url,function(err){
  if(err){
    console.log('Error database: ',err);
  } else{
    console.log('connected');
  }
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String
});

var user = mongoose.model('User',userSchema);

module.exports = user;
