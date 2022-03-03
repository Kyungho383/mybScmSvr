const express = require('express');
const app = express.Router();
const logger = require('../../@config/winston');
const jwt = require('../../@config/jwt');
const jwtOrigin = require('jsonwebtoken');
const authDto = require('./authDto');
const authService = require('./authService');
const menuService = require('../menu/menuService');


  //login
  app.post('/login',async function(req, res, next){
      let result = new Object();
      let reqDto = new authDto() ;
      reqDto = req.body;
      let accessToken ;
      try {
        var rst = await authService.selectLoginChk(reqDto);
        // console.log(rst)
        if (rst[0].cnt != 0){
          var userInfo = await authService.selectAccountInfo(reqDto);
          let userInfoDto = new authDto() ;
          userInfoDto.accUserId = userInfo[0].accUserId;
          userInfoDto.accId = userInfo[0].accId;
          userInfoDto.accMngNm = userInfo[0].accMngNm;

          accessToken = jwt.generateAccessToken(userInfoDto);
          result.accessToken = accessToken;
          refreshToken = jwt.generateRefreshToken(userInfoDto);
          result.refreshToken = refreshToken;
          let sDto = new authDto() ;
          sDto.accUserId = reqDto.accUserId;
          sDto.accessToken = accessToken;
          sDto.refreshToken = refreshToken;

        //   var resolveVal = jwt.verify(accessToken,privateKey);
        //   console.log('process.env.JWT_SECRET_KEY : ' +process.env.JWT_SECRET_KEY)
          console.log(jwtOrigin.verify(accessToken, process.env.JWT_SECRET_KEY))
          
          await authService.insertUserLoginHist(sDto);
          
          result.userInfo = userInfoDto;
          //메뉴 리스트 조회
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
          result.menuList = menuList;
          // res.status(result.resultCode).json(result);
          res.json(result);
        }else{
          // throw new Error('해당 계정 없음');
          throw new Error('not find Account');
        }
      } catch (error) {
        // console.log('gog')
        res.statusCode = 401;
        next(new Error(error.stack));
      }
  });
  app.post('/chk', async function(req, res, next){
      // jwt.authenticateAccessToken(req, res, next);
      console.log('hi');
  });

module.exports = app;