const express = require('express');
const jwt = require('jsonwebtoken');
const authDto = require('../v1/auth/authDto');
const logger = require('./winston');

// var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
// var token = jwt.sign({ userEmail: 'kyungho383@nate.com' }, 'shhhhh');
// var token = jwt.sign({ 
//     userEmail: 'kyungho383@nate.com',
//     userDeviceToken:'c7fzeFtkQQKBln6kUoPtY_:APA91bHzIxxHTTo-NmdmjA5vdWKhUxd4aGXRzxYuJUacfla1miOXcGh7Jmm-SHH_DbzPvQxBo-ohdY3mPDoT9364VvlY6zfLZtcRzlbT6vcu'
//  }, privateKey, { algorithm: 'HS512'});
// console.log(token);
// var resolveVal = jwt.verify(token,privateKey);
// console.log(resolveVal);

// access token을 secret key 기반으로 생성
// const generateAccessToken = (userEmail,userDeviceToken) => {
//     return jwt.sign({ userEmail, userDeviceToken }, process.env.JWT_SECRET_KEY,{
//         algorithm: 'HS512'
//         // expiresIn: "15m",
//     });
// };
const generateAccessToken = (authDto) => {
    return jwt.sign( JSON.stringify(authDto), process.env.JWT_SECRET_KEY,{
        algorithm: 'HS512'
        // expiresIn: "15m",
    });
};
// refersh token을 secret key  기반으로 생성
const generateRefreshToken = (authDto) => {
    return jwt.sign(JSON.stringify(authDto), process.env.JWT_REFRESH_SECRET_KEY, {
        algorithm: 'HS512'
    });
};
// access token의 유효성 검사
const authenticateAccessToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];
    let result = new Object();
    
    if (!token) {
        result.msg ="자격증명에 실패하였습니다.";
        result.msgCode ="401";
        // console.log("wrong token format or token is not sended");
        logger.warn("wrong token format or token is not sended")
        return res.status(401).json(result);
        // return res.sendStatus(400);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async(error, user) => {
        if (error) {
            // console.log(error);
            logger.warn(error)
            result.msg = "로그인에 실패하였습니다.";
            result.msgCode = "401";
            res.status(401).json(result);
        }else{
            logger.info('\n>> user : \n' + JSON.stringify(user,null,2));
            // console.log('>> user : ' );
            // console.log(user);
            req.user = user;
            req.body.accId = user.accId;
            next();
        }
    });
};

module.exports = {
    generateAccessToken
    , generateRefreshToken
    , authenticateAccessToken
};

// jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
//     if (error) {
//         console.log(error);
//         return res.sendStatus(403);
//     }
    
//     req.user = user;
//     next();
// });
