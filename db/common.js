/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-11 06:43:49
 * @LastEditTime: 2021-09-14 00:08:28
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
 * 为查询，根据columns获取column string
 * @param {*} columns 列
 */
function getColumnStringByColumnsForQuery(columns) {
  let result = '';
  if (columns) {
    for (let column of columns) {
      result += `${column.dbColumnName}${column.logicalColumnName ? ` as ${column.logicalColumnName}` : ''},`;
    }
    result = result.substring(0, result.length - 1);
  }
  return result;
}

/**
 * 为新增，根据columns获取column string
 * @param {*} columns 列
 */
function getColumnStringByColumnsForAdd(columns) {
  let result = '';
  if (columns) {
    for (let column of columns) {
      result += `${column.dbColumnName},`;
    }
    result = result.substring(0, result.length - 1);
  }
  return result;
}

/**
 * 为新增的参数，根据columns获取column string
 * @param {*} columns 入参
 */
function getParametersColumnStringByColumnsForAdd(columns) {
  let result = '';
  if (columns) {
    for (let column of columns) {
      result += `$${column.logicalColumnName},`;
    }
    result = result.substring(0, result.length - 1);
  }
  return result;
}

/**
 * 为新增，根据columns, 数据获取参数
 * @param {*} columns 列
 * @param {*} row 数据
 */
function getParameterObjectByColumnsForAdd(columns, row) {
  let result = {};
  if (columns) {
    for (let column of columns) {
      result['$' + column.logicalColumnName] = row && row[column.logicalColumnName] !== undefined ? row[column.logicalColumnName] : null;
    }
  }
  return result;
}

module.exports = {
  getDatabase,
  getColumnStringByColumnsForQuery,
  getColumnStringByColumnsForAdd,
  getParametersColumnStringByColumnsForAdd,
  getParameterObjectByColumnsForAdd,
}