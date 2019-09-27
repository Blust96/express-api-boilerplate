/**
 * Request filters
 * Filters request and response fields for each routes
 */
const Filters = {
    // Request mandatory|optional fields
    requests: {
        auth: {
            register: ['first_name', 'last_name', 'email', 'password'],
            login: ['email', 'password'],
        },
        users: {
            update: ['first_name', 'last_name', 'email'],
        }
    },
    // Response returned fields
    responses: {
        users: ['_id', 'first_name', 'last_name', 'email'],
    }
}

module.exports = Filters;