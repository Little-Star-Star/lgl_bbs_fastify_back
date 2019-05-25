/*
 * @Author: 李国亮 
 * @Date: 2019-03-06 13:50:56 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-24 16:17:59
 */

/*************************REST***********************/
exports.schema_getSecondHandList = {
	summary: '获取指定页码,指定数量的二手物品',
	description: '获取指定页码,指定数量的二手物品',
	tags: ['second-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}
exports.schema_getSecondHandDetail = {
	summary: '获取指定二手物品的详细信息',
	description: '获取指定二手物品的详细信息',
	tags: ['second-rest'],
	response: {
		200: 'res200withdata#'
	}
}
exports.schema_collect = {
	summary: '收藏/取消收藏',
	description: '收藏/取消收藏',
	tags: ['second-rest'],
	response: {
		200: 'res200withdata#'
	}
}

exports.schema_mySecondHandList = {
	summary: "获取个人二手物品列表",
	description: "获取个人二手物品列表",
	tags: ['news-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}



