const express = require('express');
const app = express.Router();
const logger = require('../../@config/winston');
const fileDto = require('./fileDto');
const fileService = require('./fileService');


module.exports = app;