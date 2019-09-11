/**
 * Imports
 */
// Node
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Inner
const { dbInit } = require('./config');
//

/**
 * Server configuration
 */
const app = express();
const serverPort = process.env.PORT || 3002

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
//

/**
 * Server launch
 */
dbInit()
.then(mongooseResponse => {
    app.listen(serverPort, () => console.log( { database: mongooseResponse, server: `http://localhost:${serverPort}` } ))
})
.catch(mongooseError => console.log(mongooseError));
//