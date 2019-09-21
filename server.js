const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { dbInit } = require('./config');
const { routes } = require('./routes');

// Server Configuration
const app = express();
const serverPort = process.env.PORT || 6578

// Middlewares call
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// // Routes call
app.use('/', routes);

// // Server launch
dbInit()
.then(mongooseResponse => {
    app.listen(serverPort, () => console.log( { database: mongooseResponse, server: `http://localhost:${serverPort}` } ))
})
.catch(mongooseError => console.log( mongooseError ));