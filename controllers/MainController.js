const { sendErrorResponse, sendApiResponse } = require('../services/apiResponses');

class MainController {

    constructor(model) {
        this.model = model;
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
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

    /**
     * Update by ID
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async updateById(req, res) {

        this.model.findOneAndUpdate({ _id: req.params.id }, req.body, { 'new': true }, (error, item) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, 'An error occured while updating resource', { error });
            // If items not found
            if(!item) sendErrorResponse(res, 404, 'Resource not found');
            // Send response
            else sendApiResponse(res, 200, 'Data successfully updated', { item });
        });

    }

    /**
     * Delete by ID
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async deleteById(req, res) {

        this.model.findOneAndDelete({ _id: req.params.id }, (error, item) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, 'An error occured while deleting resource', { error });
            // If items not found
            if(!item) sendErrorResponse(res, 404, 'Resource not found');
            // Send response
            else sendApiResponse(res, 200, 'Data successfully deleted', { item });
        });

    }

}

module.exports = MainController;