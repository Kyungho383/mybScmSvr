const express = require('express');
const app = express.Router();

const mysql = require('../../@config/mysql');
const awsS3 = require('../../@config/awsS3');
const dbAppPool = mysql.dbAppPool;
const dbScmPool = mysql.dbScmPool;
const db = mysql.db;
const partnerCenterDto = require('./partnerCenterDto');

const partnerCenterService = {
  insertAccountInfo : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst1 = await db.sqlExcute('partnerCenterMapper','insertAccountInfo', reqDto, conn);
      let sDto = new partnerCenterDto() ;
      sDto = reqDto;
      sDto.accId = rst1.insertId;
      var rst2 = await db.sqlExcute('partnerCenterMapper','insertPartnerBizInfo', sDto, conn);
      reqDto.bizId = rst2.insertId;
      var rst3 = await db.sqlExcute('partnerCenterMapper','updatePartnerAccountInfo', reqDto, conn);
      await conn.commit(); // 커밋
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  selectPartnerCenterList : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('partnerCenterMapper','selectPartnerCenterList', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  insertBrandInfo : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      await db.sqlExcute('partnerCenterMapper','insertBrandInfo', reqDto, conn);
      await conn.commit(); // 커밋
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  selectBrandList : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('partnerCenterMapper','selectBrandList', reqDto, conn);
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

module.exports = partnerCenterService;