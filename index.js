const express = require('express')
const morgan = require('morgan')
const {requireAuth, checkUser, routeGuide} = require('./middlware/authMiddleware')
const path = require('path');
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const connectDB = require('./config/db')
const app = express()



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set(path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(router)
app.use(routeGuide)




// logOut users
const logOutRouter = require('./routes/logOut')

// Import routes
const indexRoute = require('./routes/index');
const adminIndexRouter = require('./routes/adminIndex')
const loginAdminRouter = require('./routes/loginAdmin')
const aboutRouter = require('./routes/about');
const profileRouter = require('./routes/profile');
const loginUserRouter = require('./routes/loginUser');
const signUpUserRouter = require('./routes/signUpUser')
const UserRouter = require('./routes/UserIndex');
const UsersRouter = require('./routes/Users');


// Set up routes
app.get('*', checkUser)      // apply to every routes

app.use('/logOut', logOutRouter)


app.use('/', checkUser,  indexRoute);
app.use('/about', aboutRouter);
app.use('/admin', requireAuth, adminIndexRouter)
app.use('/loginAdmin', loginAdminRouter)
app.use('/User', requireAuth , UserRouter);
app.use('/Users', requireAuth, UsersRouter);
app.use('/profile', requireAuth, profileRouter)
app.use('/loginUser', loginUserRouter);
app.use('/signUpUser', signUpUserRouter);


connectDB().then(()=>{
    console.log('Connected to MongoDB')
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server listening pn port ${port}`)
    });
}).catch(err => console.log(err))