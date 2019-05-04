/*
 * @Author: 李国亮 
 * @Date: 2019-03-06 13:50:56 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-01 09:51:26
 */

/*************************REST***********************/
exports.schema_mostHotNews = {
	summary: '获取最热门的三条校园资讯',
	description: '获取最热门的三条校园资讯',
	tags: ['news-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}
exports.schema_mostNewNews = {
	summary: '获取最新的三条校园资讯',
	description: '获取最新的三条校园资讯',
	tags: ['news-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}
exports.schema_newsDetail = {
	summary: '获取校园资讯详情',
	description: '获取校园资讯详情',
	tags: ['news-rest'],
	response: {
		200: 'res200withdata#'
	}
}
