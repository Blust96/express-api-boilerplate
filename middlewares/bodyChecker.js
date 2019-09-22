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
    users: {
        update: ['first_name', 'last_name', 'email']
    }
}

/**
 * Check if body fields are missing according to mandatories
 * 
 * @param {Object} mandatories
 */
const checkRequiredFields = mandatories => {

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

/**
 * Check if body fields are accepted according to mandatories
 * 
 * @param {Object} mandatories 
 */
const checkExtraFields = mandatories => {

    return async (req, res, next) => {

        // If body is empty
        if(Object.keys(req.body).length < 1) sendErrorResponse(res, 400, 'Request body is empty', { accepted: mandatories });
        else {

            // Extra fields
            let extraFields = [];

            // Checking extra fields
            for(const field in req.body) {
                if(mandatories.indexOf(field) === -1) extraFields.push(field);
            }

            // Checking if extraFields is empty
            if(extraFields.length > 0) sendErrorResponse(res, 400, 'Extra fields in the body', { accepted: mandatories, currentFields: Object.keys(req.body), extraFields });
            // Calling next middleware or controller
            else next();

        }

    }

}

module.exports = { Mandatories, checkRequiredFields, checkExtraFields }