/*
 * @Author: 李国亮 
 * @Date: 2019-03-06 13:50:56 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-01 21:26:28
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

