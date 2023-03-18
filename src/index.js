const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')

require('./database')
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const authRouter = require('./routes/auth');

const app = express();
const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "SECRETASDSADSADASDAS",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`)
    next();
})


app.use('/api/v1/auth',authRouter);

///// CHECK IF USER IS AUTHENTICATED //////
app.use((req, res, next) => { 
    if(req.session.user){
        next();
    }else{
        res.sendStatus(401);
    }
})


//////// PROTECTED ROUTES /////////
app.use('/api/v1/users',userRouter);
app.use('/api/v1/posts',postRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});

