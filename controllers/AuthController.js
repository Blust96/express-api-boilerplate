const bcrypt = require('bcryptjs');

const UserModel = require('../models/User');

class AuthController {

    /**
     * Register a new user 
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async register(req, res) {
        let { first_name, last_name, email, password } = req.body;
        console.log(`Here ${req.body}`);
        res.send('Test');
    }

    /**
     * Login a user
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async login(req, res) {
        console.log(`Here ${req.body}`);
        res.send('Test');
    }

}

module.exports = AuthController;