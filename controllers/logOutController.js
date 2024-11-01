exports.getLogOut = (req, res)=>{
  res.cookie("jwt", " ", {maxAge:1})    //removing the token
  res.redirect('/')
}