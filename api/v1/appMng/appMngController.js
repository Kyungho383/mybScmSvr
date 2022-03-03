const express = require('express');
const app = express.Router();
const appMngDto = require('./appMngDto');
const appMngService = require('./appMngService');

  app.post('/selectAppUserList', async function(req, res, next) {
    
    var result = new Object();
    let reqDto = new appMngDto() ;
    reqDto = req.body;
    try {
      
      reqDto.startNo = Number((reqDto.pageNo-1) * reqDto.pageTerm);

      var rst = await appMngService.selectAppUserList(reqDto);

      result.result = rst;
      result.count = rst.length;
  
      res.json(result);
    } catch (error) {
      result.msg = 'INTERNAL_SERVER_ERROR';
      result.msgCode = '500';
      res.status(result.msgCode).json(result);
    }
   
  });
 

  module.exports = app;