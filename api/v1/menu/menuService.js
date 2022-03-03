const mysql = require('../../@config/mysql');
const dbAppPool = mysql.dbAppPool;
const dbScmPool = mysql.dbScmPool;
const db = mysql.db;

const menuService = {
  selectTopMenuList : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('menuMapper','selectTopMenuList', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  selectChildMenuList : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('menuMapper','selectChildMenuList', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  insertMenuInfo : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('menuMapper','insertMenuInfo', reqDto, conn);
      await conn.commit(); // 커밋
      conn.release();
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  deleteMenuInfo : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('menuMapper','deleteMenuInfo', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  updateMenuInfo : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('menuMapper','updateMenuInfo', reqDto, conn);
      await conn.commit(); // 커밋
      conn.release();
      return rst;
    } catch (error) {
      throw new Error(error);
    } finally{
      conn.release();
    }
  },

}

module.exports = menuService;