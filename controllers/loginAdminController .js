const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')


// handle errors
const handleErrors = (err)=>{
  console.log(err.message, err.code)
  let errors = {
    name:"",
    password:"",
    
  }
// name error code 
if(err.message === "Incorrect name"){
  errors.name = "Incorrect admin name"
  return errors;
}

//password error code
if(err.message === "Incorrect password"){
  errors.password = "Incorrect Admin password"
}

  return errors
}

// create Tokens
const maxAge = 3 * 24 * 60 *60    // 3days

const createToken = (id)=>{
  return jwt.sign({id, role:"admin"}, 'religionCentre secret', {
    expiresIn: maxAge
  });
}


exports.getCreatePage = (req, res) => {
    // Logic to fetch any necessary data or render the appropriate view
    res.render('loginAdmin', {
      title: 'Admin Login',
      user: res.locals.user
    });
  };

exports.login_post = async (req, res)=>{
  const {name, password} = req.body
  try{
    const admin = await Admin.login(name, password)
    const token = createToken(admin._id)
    res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge * 1000})
    res.status(200).json({admin:admin._id})
  }catch (err){
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

exports.login_get = (req, res)=>{
  res.render('loginAdmin', {
    title: 'Admin Login',
    user: res.locals.user
  })
}
