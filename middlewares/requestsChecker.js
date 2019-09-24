const { sendErrorResponse } = require('../services/apiResponses');

/**
 * Check if body fields are missing according to filters
 * 
 * @param {Object} filters
 */
const checkRequiredFields = filters => {

    return async (req, res, next) => { 

        // Missing fields
        let missingFields = [];

        // Checking if there is a missing field in the body
        filters.forEach(field => {
            if( !(field in req.body) ) missingFields.push(field);
        });

        // Checking if missingFields is empty
        if(missingFields.length > 0) sendErrorResponse(res, 400, 'Fields are missing in the body', { required: filters, currentFields: Object.keys(req.body), missingFields });
        // Calling next middleware or controller
        else next();

    }

}

/**
 * Check if body fields are accepted according to filters
 * 
 * @param {Object} filters 
 */
const checkExtraFields = filters => {

    return async (req, res, next) => {

        // If body is empty
        if(Object.keys(req.body).length < 1) sendErrorResponse(res, 400, 'Request body is empty', { accepted: filters });
        else {

            // Extra fields
            let extraFields = [];

            // Checking extra fields
            for(const field in req.body) {
                if(filters.indexOf(field) === -1) extraFields.push(field);
            }

            // Checking if extraFields is empty
            if(extraFields.length > 0) sendErrorResponse(res, 400, 'Extra fields in the body', { accepted: filters, currentFields: Object.keys(req.body), extraFields });
            // Calling next middleware or controller
            else next();

        }

    }

}

module.exports = { checkRequiredFields, checkExtraFields }