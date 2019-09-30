const { ResponseMessages, sendErrorResponse, sendApiResponse } = require('../services/apiResponses');
const { cleanDoc, cleanDocsList } = require('../services/docCleaner');

class MainController {

    constructor(model) {
        this.model = model;
        this.create = this.create.bind(this);
        this.rejectOrCreate = this.rejectOrCreate.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    }

    /**
     * Post a new document
     * 
     * @param {Request} req
     * @param {Response} res
     */
    async create(req, res, resFilters) {

        try {
            // Creating document
            const doc = await this.model.create(req.body);
            // Send response if doc successfully created
            sendApiResponse(res, 200, ResponseMessages.success.main.create, { data: cleanDoc(resFilters, doc) });
        } catch(error) {
            sendErrorResponse(res, 500, ResponseMessages.error.main.internal, { error });
        }
        
    }

    /**
     * Create a new document if doesn't exist
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async rejectOrCreate(req, res, resFilters, options) {

        this.model.findOne(options, async (error, doc) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, ResponseMessages.error.main.internal, { error });
            // If doc already exists
            if(doc) sendErrorResponse(res, 409, ResponseMessages.error.main.conflict);
            else {
                try {
                    // Creating document
                    const doc = await this.model.create(req.body);
                    // Send response if doc successfully created
                    sendApiResponse(res, 200, ResponseMessages.success.main.create, { data: cleanDoc(resFilters, doc) });
                } catch(error) {
                    sendErrorResponse(res, 500, ResponseMessages.error.main.internal, { error });
                }
            }
        });

    }

    /**
     * Get all
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getAll(req, res, resFilters) {

        this.model.find({}, (error, docs) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, ResponseMessages.error.main.internal, { error });
            // If docs not found
            if(!docs) sendErrorResponse(res, 404, ResponseMessages.error.main.notFound);
            // Send response
            else sendApiResponse(res, 200, ResponseMessages.success.main.get, { data: cleanDocsList(resFilters, docs) });
        });

    }

    /**
     * Get by ID
     * 
     * @param {Request} req
     * @param {Response} res
     */
    async getById(req, res, resFilters) {

        this.model.findById(req.params.id, (error, doc) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, ResponseMessages.error.main.internal, { error });
            // If doc not found
            if(!doc) sendErrorResponse(res, 404, ResponseMessages.error.main.notFound);
            // Send response
            else sendApiResponse(res, 200, ResponseMessages.success.main.get, { data: cleanDoc(resFilters, doc) });
        });

    }

    /**
     * Update by ID
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async updateById(req, res, resFilters) {

        this.model.findOneAndUpdate({ _id: req.params.id }, req.body, { 'new': true }, (error, doc) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, ResponseMessages.error.main.internal, { error });
            // If doc not found
            if(!doc) sendErrorResponse(res, 404, ResponseMessages.error.main.notFound);
            // Send response
            else sendApiResponse(res, 200, ResponseMessages.success.main.update, { data: cleanDoc(resFilters, doc) });
        });

    }

    /**
     * Delete by ID
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async deleteById(req, res, resFilters) {

        this.model.findOneAndDelete({ _id: req.params.id }, (error, doc) => {
            // If error occurs
            if(error) sendErrorResponse(res, 500, ResponseMessages.error.main.internal, { error });
            // If doc not found
            if(!doc) sendErrorResponse(res, 404, ResponseMessages.error.main.notFound);
            // Send response
            else sendApiResponse(res, 200, ResponseMessages.success.main.delete, { data: cleanDoc(resFilters, doc) });
        });

    }

}

module.exports = MainController;