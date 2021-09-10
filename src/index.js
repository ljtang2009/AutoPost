/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-07 12:07:26
 * @LastEditTime: 2021-09-10 13:31:54
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description:
 * @FilePath: \AutoPost\src\index.js
 */

const keyboardControl = require('./control/keyboards');
const notifierCommon = require('./common/notifier');
// const youtubePost = require('./platform/youtube/post');
const douyinPost = require('./platform/douyin/post');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const clipboardy = require('clipboardy');
const dbDemo = require('./db/demo');

(async () => {
  // //切到下一个窗口
  // await keyboardControl.shiftNextWindow();
  // // //上传youtube
  // // youtubePost.upload();
  // //下载抖音
  // await douyinPost.getVideoLinkListByUser();
  // // const dom = new JSDOM(clipboardy.readSync());
  // // console.log(dom.window.document.querySelector('._411d39e9802ae4571ae23446263bb6bc-scss').children.length);
  // notifierCommon.showNotifier({
  //   title: '提示',
  //   message: '测试',
  // });

  dbDemo.test();
})()