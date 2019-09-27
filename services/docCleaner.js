/**
 * Clean doc response according to filters
 * 
 * @param {Array} filters 
 * @param {Object} doc 
 */
const cleanDoc = (filters, doc) => {
    // Empty object
    let cleanedDoc = {};
    // For prop in doc, check if prop is in filters
    for(prop in doc) {
        if(filters.indexOf(prop) >= 0) cleanedDoc[prop] = doc[prop];
    }
    // Return cleaned doc
    return cleanedDoc;
}

/**
 * Clean docs list response according to filters
 * 
 * @param {Array} filters 
 * @param {Array} docsList 
 */
const cleanDocsList = (filters, docsList) => {
    // Empty object
    let cleanedDocsList = [];
    // For each docs, check if prop is in filters
    docsList.forEach(doc => cleanedDocsList.push( cleanDoc(filters, doc) ));
    // Return cleaned doc
    return cleanedDocsList;
}

module.exports = { cleanDoc, cleanDocsList }