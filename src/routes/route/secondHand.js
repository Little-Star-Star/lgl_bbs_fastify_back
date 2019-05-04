/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-03 07:23:38
 */

//  用于处理校园资讯相关
// 控制器
const ctrl_secondHand = require('../../controllers/secondHand')
// swagger + fastify 使用是schema 文档
const doc_secondHand = require('../schema_doc/secondHand')

module.exports = [
	/******* REST *******/
	// 获取指定页码和数量的二手物品列表
	{
		method: 'POST',
		url: '/secondHand/rest/list',
		handler: ctrl_secondHand.post_secondHandList,
		schema: doc_secondHand.schema_getSecondHandList
	},
	// 获取指定商品的详细信息
	{
		method: 'GET',
		url: '/secondHand/rest/detail/:itemId',
		handler: ctrl_secondHand.get_secondHandDetail,
		schema: doc_secondHand.schema_getSecondHandDetail
	},
]