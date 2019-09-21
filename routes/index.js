const { Router } = require('express');

// Routes import
const auth = require('./auth');
const users = require('./users');

// Router definition
const routes = Router();
const apiRoutes = Router();
const protectedRoutes = Router();

// Main routes
routes.use('/api', apiRoutes);

// API routes
apiRoutes.use('/protected', protectedRoutes);
apiRoutes.use('/auth', auth);

// Protected API routes
protectedRoutes.use('/users', users);

module.exports = { routes };