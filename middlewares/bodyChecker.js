const { sendErrorResponse } = require('../services/apiResponses');

/**
 * Request mandatories
 * Describe required fields for each route
 */
const Mandatories = {
    auth: {
        register: ['first_name', 'last_name', 'email', 'password'],
        login: ['email', 'password'],
    },
}

/**
 * Check if body fields are missing thanks to mandatories
 * 
 * @param {Object} mandatories
 */
const checkBody = mandatories => {

    return async (req, res, next) => { 

        // Missing fields
        let missingFields = [];

        // Checking if there is a missing field in the body
        mandatories.forEach(field => {
            if( !(field in req.body) ) missingFields.push(field);
        });

        // Checking if missingFields is empty
        if(missingFields.length > 0) sendErrorResponse(res, 400, 'Fields are missing in the body', { required: mandatories, currentFields: Object.keys(req.body), missingFields });
        // Calling next middleware or controller
        else next();

    }

}

module.exports = { Mandatories, checkBody }