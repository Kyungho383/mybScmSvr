const express = require('express');
const app = express.Router();
const systemDto = require('./systemDto');
mybatisMapper.createMapper([ './api/v1//.xml' ]);

app.post('/', async function(req, res, next) {
    var result = new Object();
    let reqDto = new systemDto() ;
    reqDto = req.body;

    // var systemList = await mysql.dbScmQuery(mybatisMapper.getStatement('systemMapper', 'selectTopsystemList', reqDto));
    // for (let i = 0; i < systemList.length; i++) {
    //     const systemInfo = systemList[i];

    //     var childsystemList = await mysql.dbScmQuery(mybatisMapper.getStatement('systemMapper', 'selectChildsystemList', systemInfo));
    //     for (let j = 0; j < childsystemList.length; j++) {
    //         const systemInfo = childsystemList[j];
    //         var childsystemList2 = await mysql.dbScmQuery(mybatisMapper.getStatement('systemMapper', 'selectChildsystemList', systemInfo));
    //         childsystemList[j].childsystem = childsystemList2;
    //     }
    //     systemList[i].childsystem = childsystemList;
    // }
    
    // result.result = systemList;
    // result.count = systemList.length;

    res.json(result);
  });
 

  module.exports = app;