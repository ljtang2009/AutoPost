/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-11 06:48:33
 * @LastEditTime: 2021-09-11 06:52:48
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 主配置
 * @FilePath: \AutoPost\config\config.js
 */

const path = require('path');

/**
 * 数据库文件地址
 */
const databaseFilePath = path.resolve(__dirname, '../db/main.db');

module.exports = {
  databaseFilePath,
}