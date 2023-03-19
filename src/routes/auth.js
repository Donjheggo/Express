const { Router } = require('express');
const passport = require('passport')
const { authRegisterController } = require('../controllers/auth')

const router = Router();

router.post(
    "/register", 
    authRegisterController
    );

router.post(
    '/login', 
    passport.authenticate('local'), 
    (request, response) => {
        console.log('Logged In');
        response.send(200);
    }
);

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