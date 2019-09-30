const { Router } = require('express');
const passport = require('passport');

const { checkExtraFields } = require('../middlewares/requestsChecker');
const { setAuthentication } = require('../middlewares/authentication');
setAuthentication(passport);

const usersReqFilters = require('../services/filters').requests.users;
const usersResFilters = require('../services/filters').responses.users;

const UsersController = require('../controllers/UsersController');
const controller = new UsersController();

const usersRouter = Router();

/**
 * @route GET api/users
 * @desc Get all users
 * @access Public
 */
usersRouter.get(
    '/', 
    (req, res) => controller.getAll(req, res, usersResFilters)
);

/**
 * @route GET api/users/:id
 * @desc Get user by id
 * @access Public
 */
usersRouter.get(
    '/:id', 
    (req, res) => controller.getById(req, res, usersResFilters)
);

/**
 * @route PUT api/users/:id
 * @desc Update user by id
 * @access Private
 */
usersRouter.put(
    '/:id', 
    [passport.authenticate('jwt', { session: false }), checkExtraFields(usersReqFilters.update)], 
    (req, res) => controller.updateById(req, res, usersResFilters)
);

/**
 * @route DELETE api/users/:id
 * @desc Delete user by id
 * @access Private
 */
usersRouter.delete(
    '/:id', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => controller.deleteById(req, res, usersResFilters)
);

module.exports = usersRouter;