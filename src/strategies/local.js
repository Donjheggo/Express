const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require('../database/schemas/User')
const { comparePassword } = require("../utils/helpers")

passport.use(
    new Strategy(
        {
            usernameField: 'email'
        }, 
        async (email, password, done) => {
            console.log(email);
            console.log(password);
            if(!email || !password){
                throw new Error("Missing credentials");
            }
            try{
                const userDB = await User.findOne({email});
                if(!userDB){
                    throw new Error("User not found")
                }
                const isValid = comparePassword(password, userDB.password)
                if(isValid){
                    console.log("Authenticated Successfully!");
                    done(null, userDB);
                }else{
                    console.log("Invalid Authentication");
                    done(null, null);
                }
            }catch(error){
                console.log(error);
                done(error, null);
            }
        }
    )
);