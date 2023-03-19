const passport = require('passport');
const { Strategy } = require('passport-discord');
const DiscordUser = require('../database/schemas/DiscordUser');
const Serializer = require('../serializers')

Serializer(DiscordUser)

passport.use(
    new Strategy(
        {
            clientID: '1086986721595510875',
            clientSecret: 'rRQsqeFKygz9dUp6IDbzIm1R4w6p11qM',
            callbackURL: 'http://localhost:3001/api/v1/auth/discord/redirect',
            scope: ['identify', 'email']
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log(accessToken, refreshToken)
            console.log(profile)
            try{
                const discordUser = await DiscordUser.findOne({discordID: profile.id});
                if(discordUser) {
                    console.log("Found user:", discordUser)
                    return done(null, discordUser)
                }else{
                    const newUser = await DiscordUser.create({
                        discordID: profile.id,
                        email: profile.email
                    });
                    console.log("Created User: ", newUser)
                    return done(null, newUser);
                }
            }catch(error){
                console.log(error)
                return done(error, null)
            }
        }
    ));