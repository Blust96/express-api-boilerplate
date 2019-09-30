const { Router } = require('express');
const passport = require('passport');

const { checkRequiredFields } = require('../middlewares/requestsChecker');
const { setAuthentication } = require('../middlewares/authentication');
setAuthentication(passport);

const authReqFilters = require('../services/filters').requests.auth;

const AuthController = require('../controllers/AuthController');
const controller = new AuthController();

const authRouter = Router();

/**
 * @desc User login
 * @route POST api/auth/login
 * @access Public
 */
authRouter.post(
    '/login', 
    checkRequiredFields(authReqFilters.login), 
    controller.login
);

/**
 * @desc User login by token
 * @route GET api/auth/login/token
 * @access Private
 */
authRouter.get(
    '/login/token', 
    passport.authenticate('jwt', { session: false }), 
    controller.tokenLogin
);

/**
 * @desc User register
 * @route POST api/auth/register
 * @access Public
 */
authRouter.post(
    '/register', 
    checkRequiredFields(authReqFilters.register), 
    controller.register
);

module.exports = authRouter;