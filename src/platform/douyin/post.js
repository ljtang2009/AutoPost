/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-09 16:09:29
 * @LastEditTime: 2021-09-10 12:52:19
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
const sleep = require('sleep-promise');
const clipboardy = require('clipboardy');

//根据用户获取视频列表
async function getVideoLinkListByUser() {
  //打开新页面
  await keyboardControl.createNewTab();
  //写入地址
  clipboardy.writeSync('https://www.douyin.com/user/MS4wLjABAAAA8xUmseK9-WQLGOWbjXCpYcJZU0HPGUf9-qOZ1S7oZ0Q');
  await keyboardControl.paste();
  await keyboard.type(Key.Enter);

  //鼠标移动
  //判断页面是否加载完毕
  let pageReady = false;
  try {
    const logoRegion = await screen.waitFor('assets/images/templates/douyin/douyin-logo-white.png', 5000);
    pageReady = !!logoRegion;
  }
  catch {
    //TODO 记录
  }
  if (!pageReady) {
    return;
  }
  let hasQueryAll = false;  //是否已经查询到所有
  let pageIndex = 0;
  do {
    await keyboard.type(Key.End);
    await sleep(2000);  //TODO 翻页加载时间 要可配置
    try {
      const bottomRegion = await screen.find('assets/images/templates/douyin/douyin-bottom.png');
      hasQueryAll = !!bottomRegion;
    }
    catch {
      pageIndex++;
      console.log(pageIndex);
      hasQueryAll = true; //TODO 测试代码
    }
  } while (!hasQueryAll);
  await keyboardControl.save();
}

module.exports = {
  getVideoLinkListByUser,
}