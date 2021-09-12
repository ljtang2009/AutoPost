/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-12 14:51:41
 * @LastEditTime: 2021-09-13 01:17:24
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 浏览器控制
 * @FilePath: \AutoPost\src\control\browser.js
 */

const exec = require('child_process').exec;
const {
  Key,
  keyboard,
  screen,
} = require("@nut-tree/nut-js");
const clipboardy = require('clipboardy');
const keyboardsControl = require('../control/keyboards');
const path = require('path');
const appConfig = require('../../config/config');
const chokidar = require('chokidar');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/**
 * 等待浏览器激活
 */
async function waitLaunched() {
  let result = false;
  const logoRegion = await screen.waitFor('assets/images/templates/browser/chrome-launched-icon.png', 5000);
  result = !!logoRegion;
  return result;
}

/**
 * 保存页面
 * @param {*} option 入参
 */
function save(option) {
  return new Promise(async (resolve, reject) => {
    await keyboardsControl.save();
    clipboardy.writeSync(option.fileName);
    await keyboardsControl.paste();
    await keyboard.type(Key.Enter);
    //监听是否保存完毕
    const filePath = path.resolve(appConfig.browser.downloadPath, option.fileName);
    const watcher = chokidar.watch(filePath);
    watcher.on('all', (event, path) => {
      if (event === 'add') {
        resolve();
      }
      watcher.close();
    });
  });
}

/**
 * 启动
 * @param {*} option 入参
 */
function launch(option) {
  return new Promise(async (resolve, reject) => {
    const cmd = 'chrome --start-maximized';
    exec(cmd);
    let launchErrorMsg = '未激活浏览器';
    //等待浏览器激活
    waitLaunched().then(async launched => {
      if (launched) {
        if (option && option.url) {
          clipboardy.writeSync(option.url);
          await keyboardsControl.paste();
          await keyboard.type(Key.Enter);
        }
        resolve();
      }
      else {
        reject(launchErrorMsg);
      }
    }).catch(e => {
      //TODO 记录
      reject(launchErrorMsg);
    });
  });
}

/**
 * 根据xpath查询
 * @param {*} option 入参
 */
function queryByXpath(option) {
  const dom = new JSDOM(option.content);
  let xResult = dom.window.document.evaluate(option.xpath, dom.window.document, null, dom.window.XPathResult.ANY_TYPE, null);
  let xNodes = [];
  let xRes;
  while (xRes = xResult.iterateNext()) {
    xNodes.push(xRes);
  }
  return xNodes;
}

module.exports = {
  launch,
  save,
  queryByXpath
}
