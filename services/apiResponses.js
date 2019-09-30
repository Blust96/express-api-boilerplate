/**
 * List all api response messages
 * TODO: Create generic function handling model name and request type
 */
const ResponseMessages = {
    // Error messages
    error: {
        main: {
            internal: 'An internal error occured',
            notFound: 'Resource not found',
            conflict: 'Resource already exists',
        },
        auth: {
            wrongEmail: 'Email does not exist, please try an other one',
            wrongPassword: 'Wrong password, please try an other one',
            token: 'User no longer exists for this token', // Check if JWT is still active
        }
    },
    // Success messages
    success: {
        main: {
            create: 'Resource successfully created',
            get: 'Resource successfully received',
            update: 'Resource successfully updated',
            delete: 'Resource successfully deleted',
        },
        auth: {
            login: 'Successfully logged-in !',
        }
    }
}

/**
 * Send body error response (empty or wrong fields)
 * 
 * @param {Response} res 
 * @param {Number} statusCode 
 * @param {String} errorMessage 
 * @param {Object} err 
 * @returns {Response} Returns HTTP response
 */
const sendErrorResponse = (res, statusCode, errorMessage, err = null) => {
    return res.status(statusCode).json({
        message: errorMessage,
        err: err,
        data: null
    });
}

/**
 * Send api success response
 * 
 * @param {Response} res 
 * @param {Number} statusCode 
 * @param {String} successMessage 
 * @param {Objet} data 
 * @returns {Response} Returns HTTP response
 */
const sendApiResponse = (res, statusCode, successMessage, data) => {
    return res.status(statusCode).json({
        message: successMessage,
        err: null,
        data: data
    });
}

module.exports = { ResponseMessages, sendErrorResponse, sendApiResponse };