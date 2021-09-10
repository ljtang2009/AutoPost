/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-10 13:31:20
 * @LastEditTime: 2021-09-10 14:50:44
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 
 * @FilePath: \AutoPost\src\db\demo.js
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function test() {
  const db = new sqlite3.Database(path.resolve(__dirname, './main.db'));
  // db.serialize(function () {
    db.each("SELECT url FROM douyin_user", function (err, row) {
      console.log(row);
    });
  // });
  db.close();
}

module.exports = {
  test,
}