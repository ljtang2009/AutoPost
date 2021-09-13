/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-11 06:42:15
 * @LastEditTime: 2021-09-13 23:27:00
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: blogOwner操作
 * @FilePath: \AutoPost\db\blogOwner.js
 */

const dbCommon = require('./common');

const columns = {
  userId: {
    dbColumnName: 'user_id',
    logicalColumnName: 'userId',
  },
  platform: {
    dbColumnName: 'platform',
  },
  originalId: {
    dbColumnName: 'original_id',
    logicalColumnName: 'originalId',
  },
  comment: {
    dbColumnName: 'comment',
  },
}

const defaultColumns = [
  columns.userId,
  columns.platform,
  columns.originalId,
  columns.comment,
]

/**
 * 根据平台查询
 * @param {*} option 参数
 */
function queryByPlatform(option) {
  return new Promise((resolve, reject) => {
    let currentColumns = option && option.columns ? option.columns : defaultColumns;
    let columnString = dbCommon.getColumnStringByColumnsForQuery(currentColumns);
    let sql = `SELECT ${columnString} FROM blog_owner WHERE platform = $platform`;
    const db = dbCommon.getDatabase();
    db.all(
      sql,
      {
        $platform: option.platform
      },
      (err, row) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(row);
        }
      });
    db.close();
  })
}

module.exports = {
  columns,
  queryByPlatform,
}