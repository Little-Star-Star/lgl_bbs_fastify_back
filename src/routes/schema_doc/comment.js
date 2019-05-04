/*
 * @Author: 李国亮 
 * @Date: 2019-03-06 13:50:56 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-01 21:26:28
 */

/*************************REST***********************/
exports.schema_getNewsComment = {
	summary: '获取指定页码,指定评论条数的所有评论',
	description: '获取指定页码,指定评论条数的所有评论',
	tags: ['comment-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}
