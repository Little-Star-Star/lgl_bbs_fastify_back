/*
 * @Author: 李国亮 
 * @Date: 2019-03-06 13:50:56 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-31 01:32:33
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
	summary: '获取最新的6条校园资讯',
	description: '获取最新的6条校园资讯',
	tags: ['news-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}
exports.schema_searchNews = {
	summary: '收搜校园资讯',
	description: '收搜校园资讯',
	tags: ['news-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}
exports.schema_taNews = {
	summary: '获取该作者所有News',
	description: '获取该作者所有News',
	tags: ['news-rest'],
	response: {
		200: 'res200withdata#'
	}
}
exports.schema_mostHotTopic = {
	summary: '获取评论最多校园资讯',
	description: '获取评论最多校园资讯',
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
exports.schema_followList = {
	summary: '获取关注列表',
	description: '获取关注列表',
	tags: ['news-rest'],
	response: {
		200: 'res200withdata#'
	}
}
exports.schema_follow = {
	summary: '关注/取消关注',
	description: '关注/取消关注',
	tags: ['news-rest'],
	response: {
		200: 'res200withdata#'
	}
}
exports.schema_like = {
	summary: '点赞/取消点赞',
	description: '点赞/取消点赞',
	tags: ['news-rest'],
	response: {
		200: 'res200withdata#'
	}
}
exports.schema_collect = {
	summary: '收藏/取消收藏',
	description: '收藏/取消收藏',
	tags: ['news-rest'],
	response: {
		200: 'res200withdata#'
	}
}
exports.schema_likeList = {
	summary: '点赞列表',
	description: '点赞列表',
	tags: ['news-rest'],
	response: {
		200: 'res200withdata#'
	}
}
exports.schema_feedback = {
	summary: '反馈',
	description: '反馈',
	tags: ['news-rest'],
	response: {
		200: 'res200#'
	}
}
exports.schema_report = {
	summary: '举报',
	description: '举报',
	tags: ['news-rest'],
	response: {
		200: 'res200#'
	}
}

exports.schema_myNewsList = {
	summary: "获取个人校园资讯列表",
	description: "获取个人校园资讯列表",
	tags: ['news-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}

exports.schema_myViewsList = {
	summary: "获取个人浏览列表",
	description: "获取个人浏览列表",
	tags: ['news-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}

exports.schema_myFollowTaList = {
	summary: "获取个人关注列表",
	description: "获取个人关注列表",
	tags: ['news-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}

exports.schema_myFollowMeList = {
	summary: "获取个人粉丝列表",
	description: "获取个人粉丝列表",
	tags: ['news-rest'],
	response: {
		200: 'res200withdataandpage#'
	}
}

exports.schema_myAllCollectList = {
	summary: "获取所有收藏列表",
	description: "获取所有收藏列表",
	tags: ['news-rest'],
	response: {
		200: 'res200withdata#'
	}
}
exports.schema_modifyNews = {
	summary: '修改校园资讯',
	description: '修改校园资讯',
	tags: ['news-rest'],
	response: {
		200: 'res200#'
	}
}

exports.schema_modifyNews = {
	summary: '修改校园资讯',
	description: '修改校园资讯',
	tags: ['news-rest'],
	response: {
		200: 'res200#'
	}
}

exports.schema_deleteMyViewList = {
	summary: '清空所有个人浏览记录',
	description: '清空所有个人浏览记录',
	tags: ['news-rest'],
	response: {
		200: 'res200#'
	}
}
