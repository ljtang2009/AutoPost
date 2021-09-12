/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-11 06:48:33
 * @LastEditTime: 2021-09-12 23:35:08
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 主配置
 * @FilePath: \AutoPost\config\config.js
 */

const path = require('path');

/**
 * 数据库文件地址
 */
const databaseFilePath = path.resolve(__dirname, '../db/main.db');

/**
 * 抖音配置
 */
const douyin = {
  /**
   * 博主页面翻页等待时间
   */
  blogOwnerNextPageSleepMs: 1000,
}

module.exports = {
  databaseFilePath,
  browser: {
    /**
     * 下载目录
     */
    downloadPath: 'D:/Downloads'
  },
  platform: {
    douyin,
  }
}