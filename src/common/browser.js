/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-07 12:09:23
 * @LastEditTime: 2021-09-07 13:56:09
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description:
 * @FilePath: \AutoPost\src\common\browser.js
 */

const puppeteer = require('puppeteer');
const envCommon = require('./env')

//打开页面
function openPage () {
  (async () => {
    const browser = await puppeteer.launch({ headless: envCommon.isProduction });
    const page = await browser.newPage();
    await page.goto('https://studio.youtube.com/');
    await browser.close();
  })();
}

module.exports = {
  openPage
}