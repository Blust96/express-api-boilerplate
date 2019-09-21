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

module.exports = { sendErrorResponse };