/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-09 09:43:54
 * @LastEditTime: 2021-09-09 12:13:44
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description:
 * @FilePath: \AutoPost\src\common\windows.js
 */

const {
  keyboard,
  Key,
  screen,
} = require("@nut-tree/nut-js");

//最小化
async function shiftNext() {
  await keyboard.pressKey(Key.LeftAlt, Key.Tab);
  await keyboard.releaseKey(Key.LeftAlt, Key.Tab);
}

//根据图片查找
async function find(option) {
  const region = await screen.waitFor(option.templateImage, 2000);
  return region
}

module.exports = {
  shiftNext,
  find
}