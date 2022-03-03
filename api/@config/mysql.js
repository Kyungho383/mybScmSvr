const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config({path:'./api/@config/.env'});
const logger = require('./winston');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper([
    './v1/claim/claimMapper.xml'
     , './v1/menu/menuMapper.xml'
     , './v1/order/orderMapper.xml'
     , './v1/product/productMapper.xml'
     , './v1/system/systemMapper.xml'
     , './v1/file/fileMapper.xml'
     , './v1/auth/authMapper.xml'
     , './v1/code/codeMapper.xml'
     , './v1/appMng/appMngMapper.xml'
     , './v1/partnerCenter/partnerCenterMapper.xml'
    ]);

const dbAppPool = mysql.createPool({
    connectionLimit:process.env.DB_APP_CON_LIMIT ,
    connectTimeout:Number(process.env.DB_APP_CON_TIMEOUT), //DEFAULT 10000ms
    host:process.env.DB_APP_HOST ,
    port:process.env.DB_APP_PORT ,
    user:process.env.DB_APP_USERNAME ,
    password:process.env.DB_APP_PASSWORD ,
    database:process.env.DB_APP_DATABASE ,
    multipleStatements:true 
    //  , timezone : "Asia/Seoul"
});

const dbScmPool = mysql.createPool({
    connectionLimit:process.env.DB_SCM_CON_LIMIT ,
    connectTimeout:Number(process.env.DB_SCM_CON_TIMEOUT), //DEFAULT 10000ms
    host:process.env.DB_SCM_HOST ,
    port:process.env.DB_SCM_PORT ,
    user:process.env.DB_SCM_USERNAME ,
    password:process.env.DB_SCM_PASSWORD ,
    database:process.env.DB_SCM_DATABASE ,
    multipleStatements:true 
    //  , timezone : "Asia/Seoul"
});

const db = {
    sqlExcute : async function(namespace,sql,params,connection){
        try {
            var [result] = await connection.query(mybatisMapper.getStatement(namespace,sql,params));
            return result;
        } catch (error) {
            var tmpErr = JSON.stringify(error,null,2);
            if(tmpErr.length != 2){
                throw new Error(error.stack +'\n'+ JSON.stringify(error,null,2));
            }else{
                throw new Error(error.stack);
            }
        }
    },
    dbAppSqlExcute : async function(namespace,sql,params){
        const connection = dbAppPool.getConnection(async conn => conn);
        try {
            await conn.beginTransaction();
            var [result] = await connection.query(mybatisMapper.getStatement(namespace,sql,params));
            await conn.commit(); // 커밋
            return result;
        } catch (error) {
            await conn.rollback(); // ROLLBACK
            var tmpErr = JSON.stringify(error,null,2);
            if(tmpErr.length != 2){
                throw new Error(error.stack +'\n'+ JSON.stringify(error,null,2));
            }else{
                throw new Error(error.stack);
            }
        } finally {
            conn.release();
        }
    },
    dbScmSqlExcute : async function(namespace,sql,params){
        const connection = dbScmPool.getConnection(async conn => conn);
        try {
            await conn.beginTransaction();
            var [result] = await connection.query(mybatisMapper.getStatement(namespace,sql,params));
            await conn.commit(); // 커밋
            return result;
        } catch (error) {
            await conn.rollback(); // ROLLBACK
            var tmpErr = JSON.stringify(error,null,2);
            if(tmpErr.length != 2){
                throw new Error(error.stack +'\n'+ JSON.stringify(error,null,2));
            }else{
                throw new Error(error.stack);
            }
        } finally {
            conn.release();
        }
    },
}

module.exports = {
      dbAppPool
     , dbScmPool
     , db
}




