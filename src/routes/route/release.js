/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-20 01:05:04
 */

//  用于处理校园资讯相关
// 控制器
const ctrl_release = require('../../controllers/release')
// swagger + fastify 使用是schema 文档
const doc_release = require('../schema_doc/release')

module.exports = [
	/******* REST *******/
	// 发布个人资讯
	{
		method: 'POST',
		url: '/private/release/news',
		handler: ctrl_release.post_releaseNews,
		schema: doc_release.schema_postReleaseNews
	},
]