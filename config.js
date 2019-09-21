const mongoose = require('mongoose');
const isProduction = process.env.NODE_ENV === 'production';

/**
 * If you're not running MongoDB locally, you can update the URI with :
 * mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}
 */
const connectionString = isProduction ? process.env.MONGODB_URI : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

/**
 * Init the mongo database
 * 
 * @returns {Promise} Resolved connectionString if mongoose.connect() succeed
 */
const dbInit = () => {

    return new Promise((resolve, reject) => {

        mongoose.connect(connectionString, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
        .then(db => resolve(connectionString))
        .catch(err => reject(`MongoDB not connected`, err));

    });

}

module.exports = { dbInit }