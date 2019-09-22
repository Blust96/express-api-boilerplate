const bcrypt = require('bcryptjs');

const { sendErrorResponse, sendApiResponse } = require('../services/apiResponses');

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

        UserModel.findOne({ email }, async (error, user) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, 'An error occured during user register', { error });
            // If user already exists (same email)
            if(user) sendErrorResponse(res, 409, 'User already exists');
            // Registration
            else {
                try {
                    // Creating hashed password
                    const hashedPassword = await bcrypt.hash(password, 10);
                    password = hashedPassword;
                    // Creating user
                    const user = await UserModel.create({ first_name, last_name, email, password });
                    // Send response if user successfully created
                    sendApiResponse(res, 200, 'User successfully created', { 
                        user: {
                            id: user._id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email
                        }, 
                    });
                } catch(error) {
                    sendErrorResponse(res, 500, 'An error occured during user register', { error });
                }
            }
        });
        
    }

    /**
     * Login a user
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async login(req, res) {
        
        let { email, password } = req.body;

        UserModel.findOne({ email }, async (error, user) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, 'An error occured during user login', { error });
            // If user not found
            if(!user) sendErrorResponse(res, 404, 'User not found');
            // Checking valid password
            else {
                const validPassword = bcrypt.compareSync(password, user.password);
                // If password is not valid
                if(!validPassword) sendErrorResponse(res, 401, 'Password is incorrect');
                else sendApiResponse(res, 200, 'User successfully logged-in', {
                    user: {
                        id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    },
                    token: user.generateJwt()
                });
            }
        })

    }

}

module.exports = AuthController;