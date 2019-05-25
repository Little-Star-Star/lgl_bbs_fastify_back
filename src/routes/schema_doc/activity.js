/*
 * @Author: 李国亮 
 * @Date: 2019-03-06 13:50:56 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-23 16:39:38
 */

/*************************REST***********************/
exports.schema_getActivityDetail = {
	summary: '活动校园活动细节',
	description: '活动校园活动细节',
	tags: ['activity-rest'],
	response: {
		200: 'res200withdata#'
	}
}
exports.schema_getActivityList = {
	summary: '活动校园活动列表',
	description: '活动校园活动列表',
	tags: ['activity-rest'],
	response: {
		200: 'res200withdata#'
	}
}