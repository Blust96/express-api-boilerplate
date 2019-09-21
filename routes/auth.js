const { Router } = require('express');

const AuthController = require('../controllers/AuthController');
const controller = new AuthController();

const authRouter = Router();

// Login route
authRouter.post('/login', controller.login);

// Register route
authRouter.post('/register', controller.register);

module.exports = authRouter;