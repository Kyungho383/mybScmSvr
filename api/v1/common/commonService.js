const mysql = require('../../@config/mysql');
const awsS3 = require('../../@config/awsS3');
const dbAppPool = mysql.dbAppPool;
const dbScmPool = mysql.dbScmPool;
const db = mysql.db;
const logger = require('../../@config/winston');
const commonDto = require('./commonDto');

const commonService = { 
  selectCodeList : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      // var rst = await db.sqlExcute('commonMapper','selectCodeList', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  }, 
}

module.exports = commonService;