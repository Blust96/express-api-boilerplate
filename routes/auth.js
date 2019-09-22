const { Router } = require('express');

const { Mandatories, checkRequiredFields } = require('../middlewares/bodyChecker');

const AuthController = require('../controllers/AuthController');
const controller = new AuthController();

const authRouter = Router();

// Login route
authRouter.post('/login', checkRequiredFields(Mandatories.auth.login), controller.login);

// Register route
authRouter.post('/register', checkRequiredFields(Mandatories.auth.register), controller.register);

module.exports = authRouter;