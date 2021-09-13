/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-09 12:20:33
 * @LastEditTime: 2021-09-13 22:11:46
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 键盘控制
 * @FilePath: \AutoPost\src\control\keyboards.js
 */
const {
  keyboard,
  Key,
} = require("@nut-tree/nut-js");

//切到下一个窗口
async function switchNextWindow() {
  await keyboard.pressKey(Key.LeftAlt, Key.Tab);
  await keyboard.releaseKey(Key.LeftAlt, Key.Tab);
}

//切换所有窗口
async function switchAllWindow() {
  await keyboard.pressKey(Key.LeftAlt, Key.Escape);
  await keyboard.releaseKey(Key.LeftAlt, Key.Escape);
}

//创建新tab
async function createNewTab() {
  await keyboard.pressKey(Key.LeftControl, Key.T);
  await keyboard.releaseKey(Key.LeftControl, Key.T);
}

//粘贴
async function paste() {
  await keyboard.pressKey(Key.LeftControl, Key.V);
  await keyboard.releaseKey(Key.LeftControl, Key.V);
}

//保存
async function save() {
  await keyboard.pressKey(Key.LeftControl, Key.S);
  await keyboard.releaseKey(Key.LeftControl, Key.S);
}

/**
 * 关闭tab
 */
async function closeTab() {
  await keyboard.pressKey(Key.LeftControl, Key.W);
  await keyboard.releaseKey(Key.LeftControl, Key.W);
};

module.exports = {
  switchNextWindow,
  switchAllWindow,
  createNewTab,
  closeTab,
  paste,
  save
}