/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-11 06:42:15
 * @LastEditTime: 2021-09-11 07:58:58
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: blogOwner操作
 * @FilePath: \AutoPost\db\blogOwner.js
 */

const dbCommon = require('./common');

/**
 * 根据平台查询
 * @param {*} option 参数
 */
function queryByPlatform(option) {
  let columnString = option && option.columnString ? option.columnString : 'user_id as userId,'
  // let sql = 'SELECTE FROM blog_owner WHERE platform = $platform';
  // const db = dbCommon.getDatabase();
  // db.all();
}

module.exports = {
  queryByPlatform,
}