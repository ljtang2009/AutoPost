/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-10 22:31:00
 * @LastEditTime: 2021-09-13 01:19:46
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 拉取视频
 * @FilePath: \AutoPost\src\platform\douyin\pull.js
 */

const dbBlogOwner = require('../../../db/blogOwner');
const browserControl = require('../../control/browser');
const {
  Key,
  keyboard,
  screen,
} = require("@nut-tree/nut-js");
const sleep = require('sleep-promise');
const appConfig = require('../../../config/config');
const fs = require('fs');

/**
 * 打开博主主页
 * @param {*} option 入参
 */
function openBlogOwnerPage(option) {
  return new Promise(async (resolve, reject) => {
    browserControl.launch({
      url: option.url
    }).then(async () => {
      let pageErrMsg = '博主页面未打开';
      try {
        //判断页面是否加载完毕
        const logoRegion = await screen.waitFor('assets/images/templates/douyin/douyin-logo-white.png', 5000);
        if (logoRegion) {
          resolve();
        }
        else {
          reject(pageErrMsg);
        }
      }
      catch (e) {
        //TODO 记录
        reject(pageErrMsg);
      }
    }).catch(e => {
      reject(e);
    });
  });
}

/**
 * 滚动到底部
 * @param {*} option 入参
 */
function scrollToBottom(option) {
  return new Promise(async (resolve, reject) => {
    let hasQueryAll = false;  //是否已经查询到所有
    let pageIndex = 0;
    do {
      await keyboard.type(Key.End);
      await sleep(option && option.sleepMs ? option.sleepMs : appConfig.platform.douyin.blogOwnerNextPageSleepMs);
      try {
        const bottomRegion = await screen.find('assets/images/templates/douyin/douyin-bottom.png');
        hasQueryAll = !!bottomRegion;
      }
      catch {
        pageIndex++;
        console.log(`当前第${pageIndex}页`);
        // hasQueryAll = true; //TODO 测试代码
      }
    } while (!hasQueryAll);
    resolve();
  });
}

/**
 * 查询视频地址从博主页面
 * @param {*} option 入参
 */
function queryVideoFromBlogOwnerPage(option) {
  let fileContent = fs.readFileSync(option.filePath).toString();
  // let linkList =browserControl.queryByXpath({
  //   content: fileContent,
  //   xpath: '/html/body/div/div/div[2]/div/div[4]/div[1]/div[2]/ul/li/a'
  // });
  let imgList =browserControl.queryByXpath({
    content: fileContent,
    xpath: '/html/body/div[1]/div/div[2]/div/div[4]/div[1]/div[2]/ul/li/a/div/div[1]/img'
  });
  debugger
}

// #root > div > div:nth-child(2) > div > div._67f6d320f692f9e5f19d66f4c8a1ecf9-scss > div._927ae3b0dd790b5b62eae61c7d2fa0bc-scss > div:nth-child(2) > ul
// document.querySelector("#root > div > div:nth-child(2) > div > div._67f6d320f692f9e5f19d66f4c8a1ecf9-scss > div._927ae3b0dd790b5b62eae61c7d2fa0bc-scss > div:nth-child(2) > ul")
// //*[@id="root"]/div/div[2]/div/div[4]/div[1]/div[2]/ul
// /html/body/div/div/div[2]/div/div[4]/div[1]/div[2]/ul

(async () => {
  //查询抖音的博主列表
  // const blogOwnerList = await dbBlogOwner.queryByPlatform({
  //   platform: 'douyin',
  //   columns: [dbBlogOwner.columns.userId, dbBlogOwner.columns.url]
  // });
  // console.log(blogOwnerList);

  // //打开博主主页
  // await openBlogOwnerPage({
  //   url: 'https://www.douyin.com/user/MS4wLjABAAAAnz2tqo_oCkQt_btWzAsHqTPfM3D2a1m1G-u-PniMPb4'
  // });
  // //滚动到底部
  // await scrollToBottom();
  // //保存
  // await browserControl.save({
  //   fileName: '9af9d53b-08c4-454d-b7f4-93c81f66db6f.html',
  // });
  //解析博主页面
  queryVideoFromBlogOwnerPage({
    filePath: 'D:/Downloads/9af9d53b-08c4-454d-b7f4-93c81f66db6f.html',
  })
  // await browserControl.launch({
  //   url: 'https://www.douyin.com/user/MS4wLjABAAAAnz2tqo_oCkQt_btWzAsHqTPfM3D2a1m1G-u-PniMPb4'
  // });
  // //判断页面是否加载完毕
  // let pageReady = false;
  // try {
  //   const logoRegion = await screen.waitFor('assets/images/templates/douyin/douyin-logo-white.png', 4000);
  //   pageReady = !!logoRegion;
  // }
  // catch {
  //   //TODO 记录
  //   console.log('博主页面未打开');
  // }
  // if (!pageReady) {
  //   return;
  // }
  console.log('aadd');
})();