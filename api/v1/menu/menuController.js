const express = require('express');
const app = express.Router();
const logger = require('../../@config/winston');
const menuDto = require('./menuDto');
const menuService = require('./menuService');

app.post('/selectMenuList', async function(req, res, next) {
    var result = new Object();
    let reqDto = new menuDto() ;
    reqDto = req.body;
    try {
      var menuList = await menuService.selectTopMenuList(reqDto);
      for (let i = 0; i < menuList.length; i++) {
          const menuInfo = menuList[i];

          var childMenuList = await menuService.selectChildMenuList(menuInfo);
          for (let j = 0; j < childMenuList.length; j++) {
              const menuInfo = childMenuList[j];
              var childMenuList2 = await menuService.selectChildMenuList(menuInfo);
              childMenuList[j].childMenu = childMenuList2;
          }
          menuList[i].childMenu = childMenuList;
      }
      
      result.result = menuList;
      result.count = menuList.length;

      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }

    
  });

  app.post('/insertMenuInfo', async function(req, res, next) {
    var result = new Object();
    let reqDto = new menuDto() ;
    reqDto = req.body;
    try {
      await menuService.insertMenuInfo(reqDto);  
      
      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";

      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
    

  });

  app.post('/deleteMenuInfo', async function(req, res, next) {
    var result = new Object();
    let reqDto = new menuDto() ;
    reqDto = req.body;
    try {
      await menuService.deleteMenuInfo(reqDto);  

      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";

      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
    
  });
  app.post('/updateMenuInfo', async function(req, res, next) {
    var result = new Object();
    let reqDto = new menuDto() ;
    reqDto = req.body;
    
    try {
      await menuService.updateMenuInfo(reqDto);  

      result.result = "정상 처리 되었습니다.";
      result.resultCode = "200";

      res.json(result);
    } catch (error) {
      next(new Error(error.stack));
    }
    
  });


  module.exports = app;