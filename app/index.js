const express = require('express');
const app = express();
const router = require('../config/routes');

/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/** Install express-session */
app.set('trust proxy', 1) // trust first proxy

app.use(router);

module.exports = app;