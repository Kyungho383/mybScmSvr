const express = require('express');
const app = express.Router();
const partnerCenterDto = require('./partnerCenterDto');
const partnerCenterService = require('./partnerCenterService');

  app.post('/insertAccountInfo',async function(req, res, next){
    let result = new Object();
    let reqDto = new partnerCenterDto() ;
    reqDto = req.body;
    try {
      await partnerCenterService.insertAccountInfo(reqDto);
      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";
      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
  });

  app.post('/selectPartnerCenterList',async function(req, res, next){
    let result = new Object();
    let reqDto = new partnerCenterDto() ;
    reqDto = req.body;
    try {
      reqDto.startNo = Number((reqDto.pageNo-1) * reqDto.pageTerm);
      
      var rst = await partnerCenterService.selectPartnerCenterList(reqDto);
      result.result = rst;
      result.count = rst.length;
      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
  });
  app.post('/insertBrandInfo',async function(req, res, next){
    let result = new Object();
    let reqDto = new partnerCenterDto() ;
    reqDto = req.body;
    try {
      await partnerCenterService.insertBrandInfo(reqDto);
      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";
      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
  });
  app.post('/selectBrandList',async function(req, res, next){
    let result = new Object();
    let reqDto = new partnerCenterDto() ;
    reqDto = req.body;
    try {
      var rst = await partnerCenterService.selectBrandList(reqDto);
      result.result = rst;
      result.count = rst.length;
      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
  });
  
  

module.exports = app;