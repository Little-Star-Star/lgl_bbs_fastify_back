/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-06 16:05:00
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
	//收搜校园资讯
	{
		method: 'POST',
		url: '/news/rest/searchNews',
		handler: ctrl_news.post_searchNews,
		schema: doc_news.schema_searchNews
	},
	//获取该作者所有资讯
	{
		method: 'GET',
		url: '/news/rest/taNewsList/:userId',
		handler: ctrl_news.get_taNews,
		schema: doc_news.schema_taNews
	},
	//最热门校园资讯
	{
		method: 'POST',
		url: '/news/rest/mostHotTopic',
		handler: ctrl_news.post_hotTopic,
		schema: doc_news.schema_mostHotTopic
	},
	//校园资讯详情
	{
		method: 'GET',
		url: '/news/rest/detail/:newsId',
		handler: ctrl_news.get_newsDetail,
		schema: doc_news.schema_newsDetail
	},
	//获取用户关注列表
	{
		method: 'GET',
		url: '/user/followList',
		handler: ctrl_news.get_followList,
		schema: doc_news.schema_followList
	},
	//获取用户关注列表
	{
		method: 'GET',
		url: '/user/likeList',
		handler: ctrl_news.get_likeList,
		schema: doc_news.schema_likeList
	},
	//关注/取消关注
	{
		method: 'GET',
		url: '/user/follow/:userFollowed',
		handler: ctrl_news.get_follow,
		schema: doc_news.schema_follow
	},
	//点赞/取消点赞
	{
		method: 'GET',
		url: '/user/like/:newsId',
		handler: ctrl_news.get_like,
		schema: doc_news.schema_like
	},
	//收藏/取消收藏
	{
		method: 'GET',
		url: '/user/collect/:newsId',
		handler: ctrl_news.get_collect,
		schema: doc_news.schema_collect
	},
	//反馈
	{
		method: 'POST',
		url: '/news/feedback',
		handler: ctrl_news.post_feedback,
		schema: doc_news.schema_feedback
	},
	//举报
	{
		method: 'POST',
		url: '/news/report',
		handler: ctrl_news.post_report,
		schema: doc_news.schema_report
	},
]