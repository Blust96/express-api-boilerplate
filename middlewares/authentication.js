const JwtStrategy = require('passport-jwt').Strategy;

const UserModel = require('../models/User');

/**
 * Authentication by JSON Web Token
 * 
 * @param {Request} req 
 */
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies[process.env.COOKIE_NAME];
    return token;
};

/**
 * Authentication by JSON Web Token
 * 
 * @param {Object} passport 
 */
const authJwt = (passport) => {

    // #JWT Options for passport
    const opts = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
    };
    
    // #JWT Strategy
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        UserModel.findOne({ _id: jwtPayload._id }, (err, user) => {
            if (err) { return done(err, false)}
            if (user) { 
                return done(null, user) 
            }
            else { return done(null, false) }
        });
    }));

};

module.exports = {
    setAuthentication: (passport) => {
        authJwt(passport);
    },
};