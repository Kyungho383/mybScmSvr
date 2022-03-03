const express = require('express');
const app = express.Router();
const logger = require('../../@config/winston');
const productDto = require('./productDto');
const productService = require('./productService');
const awsS3 = require('../../@config/awsS3');

  app.post('/selectProductList', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;
    try {
      
      reqDto.startNo = Number((reqDto.pageNo-1) * reqDto.pageTerm);

      var rst = await productService.selectProductList(reqDto);

      result.result = rst;
      result.count = rst.length;
      result.totalCount = rst.totalCount;
  
      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
   
  });

  app.post('/insertProductInfo', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;

    try {
      // console.log(req.files)
      if(req.files != null){
        if( (req.files.productThumbnailImgFile) !== undefined){
          reqDto.productThumbnailImgFile = req.files.productThumbnailImgFile;
        }

        // for (let i = 0; i < reqDto.productImgList.length; i++) {
        //   const element = reqDto.productImgList[i];
          
        //   if((req.files.productImgList) !== undefined ){
        //     reqDto.productImgList[i].imgFile = req.files.productImgList[i].imgFile;
        //   }
        // }
      }

      var rst = await productService.insertProductInfo(reqDto);
    
      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";
  
      res.json(result);  
    } catch (error) {
      next(new Error(error.stack));
    }
    
  });
  app.post('/updateProductInfo', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;
    try {
      if(req.files != null){
        
        //썸네일
        if( (req.files.productThumbnailImgFile) !== undefined){
          reqDto.productThumbnailImgFile = req.files.productThumbnailImgFile;
        }
      }
      var rst = await productService.updateProductInfo(reqDto);
    
      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";
  
      res.json(result);  
    } catch (error) {
      next(new Error(error.stack));
    }

  });
  
  app.post('/deleteProductInfo', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;
    
    try {
      var rst = await productService.deleteProductInfo(reqDto);
    
      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";
  
      res.json(result);  
    } catch (error) {
      next(new Error(error.stack));
    }

  });

  app.post('/selectCleanLabelList', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;
    try {
      var rst = await productService.selectCleanLabelList(reqDto);

      result.result = rst;
      result.count = rst.length;
  
      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
  });
  app.post('/insertCleanLabelList', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;
    try {
      if(req.files != null){
        if( (req.files.imgFile) !== undefined){
          reqDto.imgFile = req.files.imgFile;
        }
      }
      var rst = await productService.insertCleanLabelList(reqDto);

      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";
  
      res.json(result);  
    } catch (error) {
      next(new Error(error.stack));
    }
  });
  app.post('/updateCleanLabelList', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;
    try {
      if(req.files != null){
        if( (req.files.imgFile) !== undefined){
          reqDto.imgFile = req.files.imgFile;
        }
      }
      var rst = await productService.updateCleanLabelList(reqDto);

      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";
  
      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
  });
  app.post('/deleteCleanLabelList', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;
    try {
      var rst = await productService.deleteCleanLabelList(reqDto);

      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";

      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
  });


  app.post('/selectProductDtlInfo', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;
    try {
      var rst = await productService.selectProductDtlInfo(reqDto);
      result.result = rst;
      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
  });
  app.post('/selectCategoryList', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;
    try {
      var rst = await productService.selectCategoryList(reqDto);
      result.result = rst;
      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
  });
  app.post('/deleteFile', async function(req, res, next) {
    var result = new Object();
    let reqDto = new productDto() ;
    reqDto = req.body;
    try {
      var rst = await productService.selectCleanLabelInfo(reqDto);
      console.log(rst)
      // console.log(rst[0].imgFilePath.ltrim)
      var keyPath = rst[0].imgFilePath.substr(1, rst[0].imgFilePath.length);

      var rst2 = awsS3.s3FileDelete(keyPath);
      result.result = rst;
      res.json(result);
    } catch (error) {
      console.log('ㅎㄷㅎㄷㅎ@@')
      console.log(error)
      next(new Error(error.stack));
    }
  });

  module.exports = app;