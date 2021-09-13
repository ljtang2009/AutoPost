/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-13 23:10:49
 * @LastEditTime: 2021-09-14 01:22:30
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 视频操作
 * @FilePath: \AutoPost\db\video.js
 */

const dbCommon = require('./common');

const columns = {
  videoId: {
    dbColumnName: 'video_id',
    logicalColumnName: 'videoId',
  },
  platform: {
    dbColumnName: 'platform',
  },
  originalId: {
    dbColumnName: 'original_id',
    logicalColumnName: 'originalId',
  },
  userId: {
    dbColumnName: 'user_id',
    logicalColumnName: 'userId',
  },
  thumbnailType: {
    dbColumnName: 'thumbnail_type',
    logicalColumnName: 'thumbnailType',
  },
}

let allColumns = [];
for (let key in columns) {
  allColumns.push(columns[key]);
}

/**
 * 批量新增数据
 * @param {*} option 入参
 */
function addList(option) {
  return new Promise((resolve, reject) => {
    const db = dbCommon.getDatabase();
    db.serialize(function() {
      db.run("BEGIN TRANSACTION");
      let columnString = dbCommon.getColumnStringByColumnsForAdd(allColumns);
      let parameterColumnString = dbCommon.getParametersColumnStringByColumnsForAdd(allColumns);
      if (option && option.rows) {
        for (let row of option.rows) {
          let sql = `INSERT INTO video (${columnString}) VALUES (${parameterColumnString})`;
          console.log(sql);
          let parameter = dbCommon.getParameterObjectByColumnsForAdd(allColumns, row);
          db.run(sql, parameter);
        }
      }
      db.run("COMMIT TRANSACTION");
    });
    db.close();
  });
}

module.exports = {
  columns,
  addList,
}
