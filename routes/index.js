const { Router } = require('express');

const { apiLimiter } = require('../config');

// Routes import
const auth = require('./auth');
const users = require('./users');

// Router definition
const routes = Router();
const apiRoutes = Router();

// Main routes
routes.use('/api', apiLimiter, apiRoutes);

// API routes
apiRoutes.use('/auth', auth);
apiRoutes.use('/users', users);

module.exports = { routes };