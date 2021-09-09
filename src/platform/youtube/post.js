/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-09 13:38:10
 * @LastEditTime: 2021-09-09 13:57:50
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: youtube操作
 * @FilePath: \AutoPost\src\platform\youtube\post.js
 */

const mouseControl = require('../../control/mouse')

//上传
async function upload() {
  //鼠标点击页面上的上传按钮
  await mouseControl.moveToTemplateImageRegion({
    templateImage: 'assets/images/templates/youtube/youtube-btn-upload-on-page.png'
  });
}


module.exports = {
  upload,
}