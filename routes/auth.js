const { Router } = require('express');

const { Mandatories, checkBody } = require('../middlewares/bodyChecker');

const AuthController = require('../controllers/AuthController');
const controller = new AuthController();

const authRouter = Router();

// Login route
authRouter.post('/login', checkBody(Mandatories.auth.login), controller.login);

// Register route
authRouter.post('/register', checkBody(Mandatories.auth.register), controller.register);

module.exports = authRouter;