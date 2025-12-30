const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {Validation} = require('../middleware/middleware.js');
const authController = require('../controllers/auth.controllers.js');

router.get('/register' , authController.renderRegistrationForm);

router.get('/login' , authController.renderLoginForm);

router.post('register' , Validation , wrapAsync(authController.Registration));

router.post('login' , wrapAsync(authController.Login));


module.exports = router;