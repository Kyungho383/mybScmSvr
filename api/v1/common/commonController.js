const express = require('express');
const app = express.Router();
const logger = require('../../@config/winston');
const commonDto = require('./commonDto');
const commonService = require('./commonService');

  app.get('/pushFcm', function(req, res, next) {
    console.log('/pushFcm ');
    // res.render('index', { title: 'Express' });
  });


module.exports = app;