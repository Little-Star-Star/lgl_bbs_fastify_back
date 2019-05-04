/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-01 09:53:54
 */

//  用于处理校园资讯相关
// 控制器
const ctrl_news = require('../../controllers/news')
// swagger + fastify 使用是schema 文档
const doc_news = require('../schema_doc/news')

module.exports = [
	/******* REST *******/
	//最热门的三条校园资讯
	{
		method: 'GET',
		url: '/news/rest/mostHot',
		handler: ctrl_news.get_mostHotNews,
		schema: doc_news.schema_mostHotNews
	},
	//最新的三条校园资讯
	{
		method: 'POST',
		url: '/news/rest/mostNew',
		handler: ctrl_news.post_mostNewNews,
		schema: doc_news.schema_mostNewNews
	},
	//最新的校园资讯详情
	{
		method: 'GET',
		url: '/news/rest/detail/:newsId',
		handler: ctrl_news.get_newsDetail,
		schema: doc_news.schema_newsDetail
	},
]