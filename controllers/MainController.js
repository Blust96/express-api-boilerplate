const { sendErrorResponse, sendApiResponse } = require('../services/apiResponses');

class MainController {

    constructor(model) {
        this.model = model;
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
    }

    /**
     * Get all
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getAll(req, res) {

        this.model.find({}, (error, items) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, 'An error occured while getting resources', { error });
            // If items not found
            if(!items) sendErrorResponse(res, 404, 'Resources not found');
            // Send response
            else sendApiResponse(res, 200, 'Data successfully received', { items });
        });

    }

    /**
     * Get by ID
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getById(req, res) {

        this.model.findById(req.params.id, (error, item) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, 'An error occured while getting resource', { error });
            // If items not found
            if(!item) sendErrorResponse(res, 404, 'Resource not found');
            // Send response
            else sendApiResponse(res, 200, 'Data successfully received', { item });
        });

    }

}

module.exports = MainController;