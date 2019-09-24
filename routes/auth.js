const { Router } = require('express');

const { Filters, checkRequiredFields } = require('../middlewares/requestsChecker');

const AuthController = require('../controllers/AuthController');
const controller = new AuthController();

const authRouter = Router();

/**
 * @desc User login
 * @route POST api/auth/login
 * @access Public
 */
authRouter.post('/login', checkRequiredFields(Filters.auth.login), controller.login);

/**
 * @desc User register
 * @route POST api/auth/register
 * @access Public
 */
authRouter.post('/register', checkRequiredFields(Filters.auth.register), controller.register);

module.exports = authRouter;