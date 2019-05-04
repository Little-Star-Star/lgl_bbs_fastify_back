/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-02 14:36:24
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

]