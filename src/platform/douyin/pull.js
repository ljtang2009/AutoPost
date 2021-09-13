/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-10 22:31:00
 * @LastEditTime: 2021-09-14 01:15:49
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 拉取视频
 * @FilePath: \AutoPost\src\platform\douyin\pull.js
 */

const dbBlogOwner = require('../../../db/blogOwner');
const browserControl = require('../../control/browser');
const keyboardsControl = require('../../control/keyboards');
const {
  Key,
  keyboard,
  screen,
} = require("@nut-tree/nut-js");
const sleep = require('sleep-promise');
const appConfig = require('../../../config/config');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dbVideo = require('../../../db/video');

/**
 * 打开博主主页
 * @param {*} option 入参
 */
function openBlogOwnerPage(option) {
  return new Promise(async (resolve, reject) => {
    browserControl.switchBrowser({
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
  let videoList = [];
  let fileContent = fs.readFileSync(option.filePath).toString();
  let linkList = browserControl.queryByXpath({
    content: fileContent,
    xpath: '/html/body/div/div/div[2]/div/div[4]/div[1]/div[2]/ul/li/a'
  });
  let imgList = browserControl.queryByXpath({
    content: fileContent,
    xpath: '/html/body/div[1]/div/div[2]/div/div[4]/div[1]/div[2]/ul/li/a/div/div[1]/img'
  });
  if (linkList.length != imgList.length) {
    console.log('链接数量和图片数量不一致');
  }
  else {
    let videoUrlTemplateError = 0;
    let thumbnailTypeError = 0;
    for (let i = 0; i < linkList.length; i++) {
      let videoId = uuidv4();
      //检查Url地址
      if (linkList[i].href.indexOf(appConfig.platform.douyin.videoUrlTemplate) !== 0) {
        videoUrlTemplateError++;
        continue;
      }
      let originalId = linkList[i].href.substring(appConfig.platform.douyin.videoUrlTemplate.length);
      if (originalId.indexOf('//') > -1 || originalId.indexOf('?') > -1 || originalId.indexOf('#') > -1) {
        videoUrlTemplateError++;
        continue;
      }
      //检查缩略图后缀
      let thumbnailType = imgList[i].src.split('.');
      thumbnailType = thumbnailType[thumbnailType.length - 1];
      if (!thumbnailType || thumbnailType.length > 10) {
        thumbnailTypeError++;
        continue;
      }
      //搬运缩略图
      fs.writeFileSync(path.resolve(appConfig.thumbnailDirPath, `${videoId}.${thumbnailType}`), fs.readFileSync(path.resolve(option.filePath, '..', imgList[i].src)));
      videoList.push({
        [dbVideo.columns.videoId.logicalColumnName]: videoId,
        [dbVideo.columns.originalId.logicalColumnName]: originalId,
        [dbVideo.columns.platform.logicalColumnName]: appConfig.platform.douyin.platformCode,
        [dbVideo.columns.userId.logicalColumnName]: option.userId,
        [dbVideo.columns.thumbnailType.logicalColumnName]: thumbnailType,
        // url: linkList[i].href,
        thumbnailFilePath: imgList[i].src,
        p: path.resolve(option.filePath, '..', imgList[i].src)
      });
    }
    if (videoUrlTemplateError) {
      if (videoList.length === 0) {
        console.log('视频地址模板错误');
      }
      else {
        console.log(`${videoList.length}条视频，${videoUrlTemplateError}条地址未识别`);
      }
    }
    if (thumbnailTypeError) {
      if (videoList.length === 0) {
        console.log('缩略图获取错误');
      }
      else {
        console.log(`${videoList.length}条视频，${thumbnailTypeError}条缩略图获取错误`);
      }
    }
  }
  return videoList;
}

// #root > div > div:nth-child(2) > div > div._67f6d320f692f9e5f19d66f4c8a1ecf9-scss > div._927ae3b0dd790b5b62eae61c7d2fa0bc-scss > div:nth-child(2) > ul
// document.querySelector("#root > div > div:nth-child(2) > div > div._67f6d320f692f9e5f19d66f4c8a1ecf9-scss > div._927ae3b0dd790b5b62eae61c7d2fa0bc-scss > div:nth-child(2) > ul")
// //*[@id="root"]/div/div[2]/div/div[4]/div[1]/div[2]/ul
// /html/body/div/div/div[2]/div/div[4]/div[1]/div[2]/ul

(async () => {
  // //查询抖音的博主列表
  // const blogOwnerList = await dbBlogOwner.queryByPlatform({
  //   platform: appConfig.platform.douyin.platformCode,
  //   columns: [dbBlogOwner.columns.userId, dbBlogOwner.columns.originalId]
  // });
  // for (let blogOwner of blogOwnerList) {
  //   //打开博主主页
  //   await openBlogOwnerPage({
  //     url: appConfig.platform.douyin.blogOwnerUrlTemplate + blogOwner.originalId
  //   });
  //   //滚动到底部
  //   await scrollToBottom();
  //   const htmlFileName = blogOwner.userId + '.html';
  //   //保存
  //   await browserControl.save({
  //     fileName: htmlFileName,
  //   });
  //   //解析博主页面
  //   let videoList = queryVideoFromBlogOwnerPage({
  //     filePath: path.resolve(appConfig.browser.downloadPath, htmlFileName),
  //   })
  //   console.log('videoList', videoList);
  //   //关闭tab
  //   await keyboardsControl.closeTab();
  // }

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
  // 解析博主页面
  let videoList = queryVideoFromBlogOwnerPage({
    filePath: 'D:/Downloads/9af9d53b-08c4-454d-b7f4-93c81f66db6f.html',
    userId: '9af9d53b-08c4-454d-b7f4-93c81f66db6f'
  })
  dbVideo.addList({
    rows: videoList
  });
  // console.log('videoList', videoList.length);
  
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