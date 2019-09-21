const { Router } = require('express');
const passport = require('passport');
const { setAuthentication } = require('../middlewares/authentication');
setAuthentication(passport);

const UsersController = require('../controllers/UsersController');
const controller = new UsersController();

const usersRouter = Router();

// Get all
usersRouter.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

// Get by ID
usersRouter.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);

module.exports = usersRouter;