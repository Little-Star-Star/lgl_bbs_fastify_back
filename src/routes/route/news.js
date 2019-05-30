/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-31 01:33:39
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
	//获取个人资讯列表
	{
		method: 'POST',
		url: '/private/news/list',
		handler: ctrl_news.post_myNewsList,
		schema: doc_news.schema_myNewsList
	},
	//获取个人浏览列表
	{
		method: 'POST',
		url: '/private/view/list',
		handler: ctrl_news.post_myViewList,
		schema: doc_news.schema_myViewsList
	},
	//获取个人关注列表
	{
		method: 'POST',
		url: '/private/followTa/list',
		handler: ctrl_news.post_myFollowTaList,
		schema: doc_news.schema_myFollowTaList
	},
	//获取个人粉丝列表
	{
		method: 'POST',
		url: '/private/followMe/list',
		handler: ctrl_news.post_myFollowMeList,
		schema: doc_news.schema_myFollowMeList
	},
	//获取所有收藏列表
	{
		method: 'POST',
		url: '/private/allCollect/list',
		handler: ctrl_news.get_myAllCollectList,
		schema: doc_news.schema_myAllCollectList
	},
	//修改校园资讯
	{
		method: 'POST',
		url: '/private/news/modify',
		handler: ctrl_news.post_modifyNews,
		schema: doc_news.schema_modifyNews
	},
	//删除校园资讯
	{
		method: 'GET',
		url: '/private/news/delete/:newsId',
		handler: ctrl_news.post_deleteNews,
		schema: doc_news.schema_deleteNews
	},
	//清空所有浏览记录
	{
		method: 'GET',
		url: '/private/view/delete',
		handler: ctrl_news.get_deleteMyViewList,
		schema: doc_news.schema_deleteMyViewList
	},
]