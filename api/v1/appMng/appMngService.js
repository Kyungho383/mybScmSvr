const express = require('express');
const app = express.Router();

const mysql = require('../../@config/mysql');
const awsS3 = require('../../@config/awsS3');
const dbAppPool = mysql.dbAppPool;
const dbScmPool = mysql.dbScmPool;
const db = mysql.db;

const appMngDto = require('./appMngDto');

const productService = { 
    selectAppUserList : async function(reqDto) {
        const conn = await dbScmPool.getConnection(async conn => conn);
        try {
          await conn.beginTransaction();
          var rst = await db.sqlExcute('appMngMapper','selectAppUserList', reqDto, conn);
          await conn.commit(); // 커밋
          conn.release();
          return rst;
        } catch (error) {
          console.log(error)
          await conn.rollback(); // ROLLBACK
          throw new Error();
        }
    }
}

module.exports = productService;