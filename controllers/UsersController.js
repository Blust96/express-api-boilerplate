const MainController = require('./MainController');
const UserModel = require('../models/User');

class UsersController extends MainController {

    constructor() {
        super(UserModel);
    }

}

module.exports = UsersController;