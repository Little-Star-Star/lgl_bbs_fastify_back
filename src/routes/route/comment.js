/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-06 23:10:26
 */

//  用于处理评论相关操作
const ctrl_comment = require('../../controllers/comment')
const doc_comment = require('../schema_doc/comment')

module.exports = [
	/******* REST *******/
	//获取指定页码,指定评论条数的所有评论
	{
		method: 'POST',
		url: '/news/comment',
		handler: ctrl_comment.post_newsComment,
		schema: doc_comment.schema_getNewsComment
	},
	//对指定新闻,发布评论
	{
		method: 'POST',
		url: '/news/releaseComment',
		handler: ctrl_comment.post_releaseComment,
		schema: doc_comment.schema_releaseNewsComment
	},
	//对指定新闻,回复评论
	{
		method: 'POST',
		url: '/news/replyComment',
		handler: ctrl_comment.post_replyComment,
		schema: doc_comment.schema_replyNewsComment
	},
]