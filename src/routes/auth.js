const { Router } = require('express');
const passport = require('passport')
const User = require('../database/schemas/User');
const {hashPassword, comparePassword} = require('../utils/helpers')

const router = Router();

// router.post("/login", async (request, response) => {
//     const {email, password} = request.body;
//     if(!email || !password){
//         return response.sendStatus(400);
//     }
//     const userDB = await User.findOne({ email });
//     if(!userDB){
//         response.sendStatus(401);
//     }
//     const isValid = comparePassword(password, userDB.password);
//     if(isValid){
//         request.session.user = userDB;
//         response.sendStatus(200)
//     }else{
//         response.sendStatus(401)
//     }
// });


router.post("/login", passport.authenticate("local"), (request, response) => {
    console.log("Logged In");
    response.sendStatus(200)
});

router.post("/register", async (request, response) => {
    const {email} = request.body;
    try{
        const userDB = await User.findOne({ email });
        if(userDB){
            response.status(400).json({msg: "User already exists!"});
        }else{
            const password = hashPassword(request.body.password);
            console.log(password);
            const newUser = await User.create({ email, password});
            response.status(201).json(newUser);
        }
    }catch(error){
        if (error.name === 'ValidationError') {
            response.status(400).json({msg: "Invalid email address"});
        } else {
            console.error(error);
            response.status(500).json({msg: "Internal server error"});
        }
    }
});

router.get(
    "/discord", 
    passport.authenticate('discord'), 
    async(request, response) => {
    response.sendStatus(200);
    }
);

router.get(
    "/discord/redirect", 
    passport.authenticate('discord'), 
    (request, response) => {
        response.sendStatus(200);
    }
);

module.exports = router;