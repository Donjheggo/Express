const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

//// ROUTES IMPORT /////
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const authRouter = require('./routes/auth');

require('./database');
require('./strategies/local');
require('./strategies/discord');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "SECRETASDSADSADASDAS",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/express_practice'
    })
}));

app.use((request, response, next) => {
    console.log(`${request.method}: ${request.url}`)
    next();
})

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/posts',postRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});

