const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path:'../api/@config/.env'});
const port = process.env.SVR_PORT;
const jwt = require('./@config/jwt');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const logger = require('./@config/winston');

// const appRoot = require('app-root-path');
// const timeout = require('connect-timeout');
// app.use(timeout('5s'));
app.use(express.json());

// enable files upload
app.use(fileUpload({
  parseNested: true,
  // limits: { fileSize: 50 * 1024 * 1024 },
   useTempFiles : true,
   tempFileDir : '../imgTemp/',
  // createParentPath: true
}))
//add other middleware
app.use(cors());

const fnDefaultInfo = function (req, res, next){
  logger.info('[' + req.method + '] ' + req.originalUrl);
  if(req.files === undefined){
    logger.info('\n' + JSON.stringify(req.body,null,2));
  }else{
    logger.info('\n' + JSON.stringify(req.body,null,2) + '\n' + JSON.stringify(req.files,null,2));
  }
  
  // console.log(req.files)
  next();
}

app.use('/v1/auth'          , fnDefaultInfo, require('./v1/auth/authController.js')    );
app.use('/v1/test'          , fnDefaultInfo, require('./v1/test/testController')     );
app.use('/v1/product'       , fnDefaultInfo, jwt.authenticateAccessToken ,require('./v1/product/productController')    );
app.use('/v1/partnerCenter' , fnDefaultInfo, jwt.authenticateAccessToken ,require('./v1/partnerCenter/partnerCenterController')    );
app.use('/v1/menu'          , fnDefaultInfo, jwt.authenticateAccessToken ,require('./v1/menu/menuController')    );
app.use('/v1/order'         , fnDefaultInfo, jwt.authenticateAccessToken ,require('./v1/order/orderController')    );
app.use('/v1/appMng'        , fnDefaultInfo, jwt.authenticateAccessToken ,require('./v1/appMng/appMngController')    );
app.use('/v1/common'        , fnDefaultInfo, jwt.authenticateAccessToken ,require('./v1/common/commonController')     );
app.use('/v1/code'          , fnDefaultInfo, jwt.authenticateAccessToken ,require('./v1/code/codeController')     );

app.use(function (err, req, res, next){
  var result = new Object();
  logger.error(err.stack);
  
  if(res.statusCode == 401){
    result.msg = "로그인에 실패하였습니다.";
    result.msgCode = "401";
    res.status(401);
  }else{
    result.msg = 'INTERNAL_SERVER_ERROR';
    result.msgCode = '500';
    res.status(500);
  }
  res.json(result);
})

app.use((req,res)=>{
  var result = new Object();
  result.msg = '유효하지 않은 요청입니다.'
  result.msgCode = '404';
  res.status(404).send(result);
})

app.listen(port, function () {
  // console.log('Example app listening on port : ' + port);
  logger.info(process.env.SVR_NAME +' listening on port : ' + port);
});

module.exports = app;