const { Router } = require('express');
const passport = require('passport');

const { Mandatories, checkRequiredFields, checkExtraFields } = require('../middlewares/bodyChecker');
const { setAuthentication } = require('../middlewares/authentication');
setAuthentication(passport);

const UsersController = require('../controllers/UsersController');
const controller = new UsersController();

const usersRouter = Router();

// Get all
usersRouter.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

// Get by ID
usersRouter.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);

// Update by ID
usersRouter.patch('/:id', [passport.authenticate('jwt', { session: false }), checkExtraFields(Mandatories.users.update)], controller.updateById);

// Delete by ID
usersRouter.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteById);

module.exports = usersRouter;