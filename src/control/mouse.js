/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-09 12:27:46
 * @LastEditTime: 2021-09-09 13:58:10
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 鼠标控制
 * @FilePath: \AutoPost\src\control\mouse.js
 */

const {
  screen
} = require("@nut-tree/nut-js");

//鼠标移动到模板图片位置
async function moveToTemplateImageRegion(option) {
  const region = await screen.waitFor(option.templateImage, option && option.timeoutMs ? option.timeoutMs : 1000);
  console.log(region);
}


module.exports = {
  moveToTemplateImageRegion,
}
