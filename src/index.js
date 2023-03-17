const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')

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

app.use('/api/v1/users',userRouter);
app.use('/api/v1/posts',postRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});

