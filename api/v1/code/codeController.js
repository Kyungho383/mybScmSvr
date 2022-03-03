const express = require('express');
const app = express.Router();
const logger = require('../../@config/winston');
const codeDto = require('./codeDto');
const codeService = require('./codeService');

app.post('/selectCodeList', async function(req, res, next) {
  var result = new Object();
  let reqDto = new codeDto() ;
  reqDto = req.body;
  try {
    var rst = await codeService.selectCodeList(reqDto);
    result.result = rst;
    result.count = rst.length;
    res.json(result);
  } catch (error) {
    next(new Error(error.stack));
  }
});
   
  module.exports = app;