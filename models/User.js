const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');

// Schema Definition
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
}, { timestamps: true });

/**
 * Generate a JWT for the user
 * 
 * @returns {String} Returns the JWT string
 */
userSchema.methods.generateJwt = function generateJwt() {

    // JWT expiration's settings
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 59);

    // JWT creation
    return jwt.sign({
        _id: this._id,
        email: this.email,
        password: this.password,
        expireIn: '10s',
        exp: parseInt(expiry.getTime() / 100, 10)
    }, process.env.JWT_SECRET);

}

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;