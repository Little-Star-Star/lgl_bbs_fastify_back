/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:48:40 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-02 16:58:06
 */
// 引入每个分支路由集合

const r_userInfo = require('./route/userInfo')
const r_account = require('./route/account')
const r_news = require('./route/news')
const r_comment = require('./route/comment')
const r_secondHand = require('./route/secondHand')
const r_release= require('./route/release')
const routes_account = [...r_account]
const routes_userInfo = [...r_userInfo]
const routes_news = [...r_news]
const routes_comment = [...r_comment]
const routes_secondHand = [...r_secondHand]
const routes_release = [...r_release]
module.exports = {
	routes_account,
	routes_userInfo,
	routes_news,
	routes_comment,
	routes_secondHand,
	routes_release
}
