const User = require('../models/user');
const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err)=>{
  console.log(err.message, err.code)
  let errors = {
    email:"",
    password:"",
    
  }

  // incorrect email Error
  if(err.message === "Incorrect email"){
    errors.email = "That email is not registered"
  }

  // incorrect password Error
  if(err.message === "Incorrect password"){
    errors.password = "Incorrect Password"
  }

  //validation error
  if(err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path]= properties.message
    })
  }

  return errors
}

//token
const maxAge = 1 * 24 * 60 * 60

const createToken = (id) => {
  return jwt.sign({id, role: "User"}, 'religionCentre secret', {   // religionCentre secret is the jwt secret key to sign the token
    expiresIn:maxAge
  })
}

exports.getCreatePage = (req, res) => {
    // Logic to fetch any necessary data or render the appropriate view
    res.render('loginUser', {
      title: 'User Login',
      user: res.locals.user
    });
  };

exports.login_post = async (req, res)=>{
  const {email, password} = req.body
  try{
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge * 1000})
    res.status(200).json({user:user._id})
  }catch (err){
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

exports.login_get = (req, res)=>{
  res.render('loginUser', {
    title: 'User Login',
    
  })
}