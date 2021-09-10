/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-11 06:43:49
 * @LastEditTime: 2021-09-11 06:55:55
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 通用操作
 * @FilePath: \AutoPost\db\common.js
 */

const sqlite3 = require('sqlite3').verbose();
const appConfig = require('../config/config');

/**
 * 获取数据库
 * @param {*} option 入参
 */
function getDatabase(option) {
  return new sqlite3.Database(option && option.databaseFilePath ? option.databaseFilePath : appConfig.databaseFilePath);
}

module.exports = {
  getDatabase,
}