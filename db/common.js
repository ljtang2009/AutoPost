/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-11 06:43:49
 * @LastEditTime: 2021-09-12 10:31:13
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

/**
 * 根据columns获取column string
 * @param {*} columns 列
 */
function getColumnStringByColumns(columns) {
  let result = '';
  if (columns) {
    for (let column of columns) {
      result += `${column.dbColumnName}${column.logicalColumnName ? ` as ${column.logicalColumnName}` : ''},`;
    }
    result = result.substring(0, result.length - 1);
  }
  return result;
}

module.exports = {
  getDatabase,
  getColumnStringByColumns
}