/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-09 16:09:29
 * @LastEditTime: 2021-09-10 00:39:24
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 抖音
 * @FilePath: \AutoPost\src\platform\douyin\post.js
 */

const keyboardControl = require('../../control/keyboards');
const {
  keyboard,
  Key,
  mouse,
  straightTo,
  Point,
  screen,
  centerOf,
} = require("@nut-tree/nut-js");
const clipboardy = require('clipboardy');

//根据用户获取视频列表
async function getVideoLinkListByUser() {
  //打开新页面
  await keyboardControl.createNewTab();
  //写入地址
  keyboard.config.autoDelayMs = 0;
  await keyboard.type('https://www.douyin.com/user/MS4wLjABAAAA8xUmseK9-WQLGOWbjXCpYcJZU0HPGUf9-qOZ1S7oZ0Q');
  await keyboard.type(Key.Enter);
  //鼠标移动
  mouse.config.mouseSpeed = 4000;
  await mouse.move(straightTo(new Point(1000, 350)));
  const logoRegion = await screen.waitFor('assets/images/templates/douyin/douyin-logo-white.png', 10000);
  if (logoRegion) {
    await mouse.rightClick();
    setTimeout(async () => {
      // await keyboard.type(Key.Down);
      // keyboard.config.autoDelayMs = 100;
      await keyboard.type(Key.Down);
      await keyboard.type(Key.Down);
      await keyboard.type(Key.Down);
      await keyboard.type(Key.Down);
      await keyboard.type(Key.Down);
      await keyboard.type(Key.Down);
      await keyboard.type(Key.Enter);
      console.log(clipboardy.readSync());
    }, 1000);
    // const copyLinkButtonRegion = await screen.waitFor('assets/images/templates/browser/chrome-copy-link.png', 1000, {confidence: 0.95});
    // if (copyLinkButtonRegion) {
    //   console.log('copyLinkButtonRegion', copyLinkButtonRegion);
    //   await mouse.move(straightTo(centerOf(copyLinkButtonRegion)));
    // }
    // await keyboard.type(Key.Down);
    // await keyboard.type(Key.Down, Key.Down, Key.Down, Key.Down, Key.Down, Key.Down, Key.Enter);
  }
}

module.exports = {
  getVideoLinkListByUser,
}