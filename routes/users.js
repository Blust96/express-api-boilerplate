const { Router } = require('express');
const passport = require('passport');

const { Filters, checkRequiredFields, checkExtraFields } = require('../middlewares/requestsChecker');
const { setAuthentication } = require('../middlewares/authentication');
setAuthentication(passport);

const UsersController = require('../controllers/UsersController');
const controller = new UsersController();

const usersRouter = Router();

/**
 * @route GET api/protected/users
 * @desc Get all users
 * @access Public
 */
usersRouter.get('/', controller.getAll);

/**
 * @route GET api/protected/users/:id
 * @desc Get user by id
 * @access Public
 */
usersRouter.get('/:id', controller.getById);

/**
 * @route PUT api/protected/users/:id
 * @desc Update user by id
 * @access Private
 */
usersRouter.put('/:id', [passport.authenticate('jwt', { session: false }), checkExtraFields(Filters.users.update)], controller.updateById);

/**
 * @route DELETE api/protected/users/:id
 * @desc Delete user by id
 * @access Private
 */
usersRouter.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteById);

module.exports = usersRouter;