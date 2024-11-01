const mongoose  = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
  },
 
  password:{
    type:String, 
    required:[true, 'please enter password'],
    minlength:[6, 'minimum of 6 character'],
  },
  role:{
    type:String, 
    required:[true, 'please enter role'],
    minlength:[4, 'minimum of 4 character'],
  }
});

//mongoose hooks starts here



// static method to login user 
adminSchema.statics.login = async function(name, password) {
  const user = await this.findOne({ name });
  if (user) {
    if (password === user.password) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect name');
}

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;
