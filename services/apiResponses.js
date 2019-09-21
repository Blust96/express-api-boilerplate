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

module.exports = { sendErrorResponse, sendApiResponse };