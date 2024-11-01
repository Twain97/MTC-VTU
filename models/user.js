const mongoose  = require('mongoose');
const {isEmail} = require('validator')
const bcrypt    = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
  },
  email:{
    type:String, 
    required:[true, 'please enter email'], 
    unique:true, 
    lowercase:true,
    validate:[isEmail, 'Please enter a valid email ']
  },
  password:{
    type:String, 
    required:[true, 'please enter password'],
    minlength:[6, 'minimum of 6 character'],
  },
  age: {
    type: Number,
    required: [true, "Please enter your age"]
  },
  role:{
    type:String, 
    minlength:[4, 'minimum of 4 character'],
  },
  gender: {
    type: String,
    required: [true, "Please enter your gender"]
  },
  contactInformation: {
    type: String,
    required: [true, 'please enter contact']
  }
});

//mongoose hooks starts here

//fire a function before document is saved to database
userSchema.pre('save', async function(next){
  console.log('user about to be created and saved', this) // 'this' refers to the user we created in the User controller using 'User create'
 // to hash a password before user is saved
 // be sure to install bcrypt before moving further
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//fire a function after doc is saved in database
userSchema.post('save', function (doc, next){
console.log('New user was created and saved', doc)
  next();
})

//mnongoose hooks ends here


// static login 
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;
