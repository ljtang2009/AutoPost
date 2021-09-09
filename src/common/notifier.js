/*
 * @Author: ho_ho_gl@hotmail.com
 * @Date: 2021-09-09 13:04:56
 * @LastEditTime: 2021-09-09 13:31:37
 * @LastEditors: ho_ho_gl@hotmail.com
 * @Description: 
 * @FilePath: \AutoPost\src\common\notifier.js
 */

const path = require('path');
const notifier = require('node-notifier');

const icons = {
  file: 'file.png',
  folder: 'folder.png',
  mail: 'mail.png',
  message: 'message.png',
  network: 'network.png',
  system: 'system.png',
}

//弹出提示
function showNotifier (option) {
  notifier.notify({
    title: option.title,
    message: option.message,
    icon: path.join(__dirname, '../../assets/images/notification', option.icon ? option.icon : icons.system),
  });
}

module.exports = {
  showNotifier,
  icons,
}