const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Admin   = require('../models/admin')

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt

    // check if jwt exists
    if(token){
        jwt.verify(token, "religionCentre secret", (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        res.redirect('/');
    }
    
}


// check current user
const checkUser = (req, res, next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, "religionCentre secret", async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id)
                let AdminUser = await Admin.findById(decodedToken.id)
                if(user){
                    res.locals.user = user;
                    console.log("current user:= ", user.name)
                }else if(AdminUser){
                    res.locals.user = AdminUser;
                    console.log("current user:= ",AdminUser.name)
                }else{
                    res.locals.user = null;
                    console.log("current user:= ",null)
                }
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

// guide routes
// this protects authorized users from accessing routes that are not allowed for their roles

const routeGuide = (req, res, next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, "religionCentre secret", async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
              return  next();
            }else{
                console.log(decodedToken);
                const route = `${req.method} ${req.originalUrl}`
                const user = await User.findById(decodedToken.id)
                const admin = await Admin.findById(decodedToken.id)
                 if(user){
                    res.locals.user = user;
                    if(
                        route == 'GET /admin' || 
                        route == 'GET /loginUser'|| 
                        route == 'GET /loginAdmin' || 
                        route == 'GET /signUpUser'|| 
                        route == 'GET /createEvent'
                     ){
                        console.log("Route not allowed")
                        return res.redirect('/User')
                    }
                }else if(admin){
                    res.locals.user = admin;
                    if( route == 'GET /User' || 
                        route == 'GET /loginAdmin' || 
                        route == 'GET /loginUser'  || 
                        route == 'GET /signUpUser'){
                        console.log("Route not allowed")
                        return res.redirect('/admin')
                    }
                }
                next()
            }
        })
    }else{
        next()
    }
    console.log(`Accessing route =  ${req.method} ${req.originalUrl}`)
}
module.exports = {requireAuth, checkUser, routeGuide}  // to be required on every protected routes in app.js