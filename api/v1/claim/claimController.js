const express = require('express');
const app = express.Router();
const logger = require('../../@config/winston');
const claimDto = require('./claimDto');
const claimService = require('./claimService');


module.exports = app;