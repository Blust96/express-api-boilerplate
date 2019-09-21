// Request mandatories
const Mandatories = {
    auth: {
        register: ['first_name', 'last_name', 'email', 'password'],
        login: ['email', 'password'],
    },
}

/**
 * Check if body is empty, and verify route mandatories
 * 
 * @param {Object} mandatories 
 */
const checkBody = mandatories => {

    return async (req, res, next) => {

        if(typeof req.body === 'undefined' || req.body === null) 

        // Missing fields
        let missingFields = [];

        // Checking if there is a missing field in the body
        mandatories.forEach(field => {
            if( !(field in req.body) ) missingFields.push(field);
        });

    }

}

module.exports = { Mandatories, checkBody }