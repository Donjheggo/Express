const passport = require('passport')

const Serializer = (User) => {
    passport.serializeUser( (user, done) => {
        console.log("Serializing user...");
        console.log(user)
        done(null, user.id)
    })
    
    passport.deserializeUser( async (id, done) => {
        console.log("Deserializing user...");
        console.log(id)
        try{
            const user = await User.findById(id);
            if(!user) throw new Error("User not found")
            console.log(user)
            done(null, user)
        }catch(error){
            console.log(error)
            done(error, null);
        }
    });
}

module.exports = Serializer