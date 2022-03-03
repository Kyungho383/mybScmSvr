const express = require('express');
const app = express.Router();

const mysql = require('../../@config/mysql');
const dbAppPool = mysql.dbAppPool;
const dbScmPool = mysql.dbScmPool;
const db = mysql.db;

const systemService = { 

}

module.exports = systemService;