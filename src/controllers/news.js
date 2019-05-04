/*
 * @Author: 李国亮 
 * @Date: 2019-04-30 23:16:24 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-01 10:12:45
 */
const model_news = require('../models/news')
const model_userInfo = require('../models/userInfo')
const boom = require('boom')
/*************************REST***********************/
/**
 * 获取最热门的前三新闻资讯
 * /news/rest/mosthot
 * @param {*} req 
 * @param {*} reply
 */
exports.get_mostHotNews = async (req, reply) => {
	try {
        const r = await model_news.find().sort({"statics.view":-1}).limit(3)
        for(let i = 0; i < r.length; i++){
            if(r[i].userId){
                r[i] = r[i].toObject()
                const user = await model_userInfo.findById(r[i].userId).select({'account':0})
                r[i].user = user.toObject()
            }
        }
        reply.code(200).send({
            code:'success',
            msg:'',
            data:r
        })
	} catch (error) {
		throw boom.boomify(error)
	}
}

/**
 * 获取最新的前6新闻资讯
 * /news/rest/mostNew
 * @param {*} req 
 * @param {*} reply
 */
exports.post_mostNewNews = async (req, reply) => {
	try {
        let {pageIndex,pageSize} = req.body
        const r = await model_news.find().sort({"createTime":-1}).limit(pageSize).skip((pageIndex-1)*pageSize)
        for(let i = 0; i < r.length; i++){
            r[i] = r[i].toObject()
            if(r[i].userId){
                const user = await model_userInfo.findById(r[i].userId).select({'account':0})
                r[i].user = user.toObject()
            }
        }
        reply.code(200).send({
            code:'success',
            msg:'',
            data:r,
            page:{
                pageIndex,
                pageSize
            }
        })
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 获取某一具体新闻详情
 * /news/rest/detail
 * @param {*} req 
 * @param {*} reply
 */
exports.get_newsDetail = async (req, reply) => {
	try {
        let r = await model_news.findById(req.params.newsId)
        if(r.userId){
            r = r.toObject()
            const user = await model_userInfo.findById(r.userId).select({'account':0})
            r.user = user.toObject()
            reply.code(200).send({
                code:'success',
                msg:'',
                data:r,
            })
        }
	} catch (error) {
		throw boom.boomify(error)
	}
}