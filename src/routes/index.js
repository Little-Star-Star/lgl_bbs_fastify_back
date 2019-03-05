/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:48:40 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-03-05 15:02:45
 */
// 引入每个分支路由集合

const r_userInfo = require('./route/userInfo')
const r_account = require('./route/account')
const routes_account = [...r_account]
const routes_userInfo = [...r_userInfo]

module.exports = {
	routes_account,
	routes_userInfo
}
