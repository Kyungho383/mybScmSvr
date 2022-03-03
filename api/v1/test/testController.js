const express = require('express');
const app = express.Router();
const mysql = require('../../@config/mysql');
const mybatisMapper = require('mybatis-mapper');

app.get('/test', function(req, res, next) {
  console.log('/들어옴3 ');
  // res.render('indxe', { title: 'Express' });
  let result = new Object();
  result.msg = 'sucsess';
  res.json(result);
});

module.exports = app;