/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-23 16:39:48
 */

//  用于处理校园资讯相关
// 控制器
const ctrl_activity = require('../../controllers/activity')
// swagger + fastify 使用是schema 文档
const doc_activity = require('../schema_doc/activity')

module.exports = [
	/******* REST *******/
	// 获取活动列表
	{
		method: 'GET',
		url: '/activity/list',
		handler: ctrl_activity.get_activityList,
		schema: doc_activity.schema_getActivityList
	},
	// 获取活动细节
	{
		method: 'GET',
		url: '/activity/detail/:activityId',
		handler: ctrl_activity.get_activityDetail,
		schema: doc_activity.schema_getActivityDetail
	},
]