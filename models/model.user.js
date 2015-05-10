var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
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
  email: {type:String, unique:'Ya existe un usuario con este correo',required:'Por favor ingresa el correo'},
  password: {type: String, required: 'Por favor ingresa la contraseña'}
});

userSchema.pre('save', function(next) {
  if (this.password) {
    this.password = this.generateHash(this.password);
  }
  next();
});



userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

userSchema.methods.validPassword = function(pass){
  return bcrypt.compareSync(pass,this.password);
}

var user = mongoose.model('User',userSchema);

module.exports = user;
