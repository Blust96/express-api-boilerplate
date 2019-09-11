/**
 * Imports
 */
const mongoose = require('mongoose');
const isProduction = process.env.NODE_ENV === 'production';
//

/**
 * Configuration
 * 
 * If you're not running MongoDB locally, you can update the URI with :
 * mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}
 */
const connectionString = isProduction ? process.env.MONGODB_URI : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const dbInit = () => {

    return new Promise((resolve, reject) => {

        mongoose.connect(connectionString, { useNewUrlParser: true, useFindAndModify: false })
        .then(db => resolve(connectionString))
        .catch(err => reject(`MongoDB not connected`, err));

    });

}
//

module.exports = { dbInit }