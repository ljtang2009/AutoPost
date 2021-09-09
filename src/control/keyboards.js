/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-09 12:20:33
 * @LastEditTime: 2021-09-09 16:18:00
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 键盘控制
 * @FilePath: \AutoPost\src\control\keyboards.js
 */
const {
  keyboard,
  Key,
} = require("@nut-tree/nut-js");

//切到下一个窗口
async function shiftNextWindow() {
  await keyboard.pressKey(Key.LeftAlt, Key.Tab);
  await keyboard.releaseKey(Key.LeftAlt, Key.Tab);
}

//创建新tab
//切到下一个窗口
async function createNewTab() {
  await keyboard.pressKey(Key.LeftControl, Key.T);
  await keyboard.releaseKey(Key.LeftControl, Key.T);
}

module.exports = {
  shiftNextWindow,
  createNewTab
}