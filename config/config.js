/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-11 06:48:33
 * @LastEditTime: 2021-09-14 00:25:55
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
  platformCode: 'd',
  /**
   * 博主页面翻页等待时间
   */
  blogOwnerNextPageSleepMs: 2000,
  /**
   * 博主页面地址模板
   */
  blogOwnerUrlTemplate: 'https://www.douyin.com/user/',
  /**
   * 视频页面地址模板
   */
  videoUrlTemplate: 'https://www.douyin.com/video/',
}

/**
 * 缩略图存放地址
 */
const thumbnailDirPath = 'D:/Downloads/thumbnailDirPath';

module.exports = {
  databaseFilePath,
  thumbnailDirPath,
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