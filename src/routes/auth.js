const { Router } = require('express');
const User = require('../database/schemas/User');
const {hashPassword} = require('../utils/helpers')

const router = Router();

router.post("/login", async (request, response) => {
    const {email, password} = request.body;
    if(!email || !password){
        return response.sendStatus(400);
    }
    const userDB = await User.findOne({ email });
    if(!userDB){
        response.sendStatus(401);
    }
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

module.exports = router;