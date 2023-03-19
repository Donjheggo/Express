const { Router } = require('express');
const passport = require('passport')
const { authRegisterController, authLoginController } = require('../controllers/auth')

const router = Router();

router.post(
  '/login', 
  authLoginController
  );

router.post(
    "/register", 
    authRegisterController
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