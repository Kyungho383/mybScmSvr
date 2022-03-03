const mysql = require('../../@config/mysql');
const awsS3 = require('../../@config/awsS3');
const dbAppPool = mysql.dbAppPool;
const dbScmPool = mysql.dbScmPool;
const db = mysql.db;
const authDto = require('./authDto');

const authService = {
  selectUserChk : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      //1.유저 체크
      var mainResultInfo = await db.sqlExcute('authMapper','selectUserChk', reqDto, conn);
      await conn.commit(); // 커밋
      return mainResultInfo;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  selectLoginChk : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('authMapper','selectLoginChk', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error.stack);
    } finally{
      conn.release();
    }
  },
  selectAccountInfo : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('authMapper','selectAccountInfo', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  insertUserLoginHist : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('authMapper','insertUserLoginHist', reqDto, conn);
      await conn.commit(); // 커밋
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  selectUserNickNmChk : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('authMapper','selectUserNickNmChk', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      // throw new Error(error);
      // return false;
    } finally{
      conn.release();
    }
  },
  selectUserEmailChk : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('authMapper','selectUserEmailChk', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
      // return false;
    } finally{
      conn.release();
    }
  },


}

module.exports = authService;