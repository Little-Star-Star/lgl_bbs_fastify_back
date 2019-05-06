/*
 * @Author: 李国亮 
 * @Date: 2019-04-30 23:16:24 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-07 01:57:21
 */
const model_news = require('../models/news')
const model_newsComment = require('../models/newsComment')
const model_userInfo = require('../models/userInfo')
const boom = require('boom')
const mongoose = require('mongoose')
/*************************REST***********************/
/**
 * 获取某一条资讯的评论
 * /comment
 * @param {*} req 
 * @param {*} reply
 */
exports.post_newsComment = async (req, reply) => {
    try {
        let {
            sortType = 'createTime',
                newsId,
                pageIndex,
                pageSize
        } = req.body
        // 依据newsId,查找news对应的所有评论
        let allComments = await model_newsComment.find({
                newsId: mongoose.Types.ObjectId(newsId)
            })
            .populate('news', {
                account: 0
            })
            .sort({
                [sortType]: -1
            })
            .limit(pageSize)
            .skip((pageIndex - 1) * pageSize)
            .lean()
        for (let i = 0; i < allComments.length; i++) {
            // 将发布这条评论的用户信息找出来
            let commentUser = await model_userInfo.findById(allComments[i].userId)
                .select({
                    'account': 0
                }).lean()
            allComments[i].user = commentUser
            // 将所有回复用户找出来
            for (let j = 0; j < allComments[i].replyData.length; j++) {
                let replyUser = await model_userInfo.findById(allComments[i].replyData[j].userId)
                    .select({
                        'account': 0
                    }).lean()
                let replyToUser = await model_userInfo.findById(allComments[i].replyData[j].toUserId)
                    .select({
                        'account': 0
                    }).lean()
                allComments[i].replyData[j].replyUser = replyUser
                allComments[i].replyData[j].replyToUser = replyToUser
            }
        }
        reply.code(200).send({
            code: 'success',
            msg: '',
            data: allComments,
            page: {
                pageIndex,
                pageSize
            }
        })
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 发布某一条资讯的评论
 * /new/realseComment
 * @param {*} req 
 * @param {*} reply
 */
exports.post_releaseComment = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    try {
        let {
            newsId,
            text
        } = req.body
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '用户未登录或登录失效',
                data: []
            })
        } else {
            const r = new model_newsComment({
                newsId,
                text,
                userId:userId
            }).save(async (err,result)=>{
                const news = await model_news.findById(newsId)
                news.statics.comment = news.statics.comment + 1
                news.save((err,r)=>{})
                const r1 = await model_userInfo.findById(result.userId).lean()
                result = result.toObject()
                result.user = r1
                reply.code(200).send({
                    code: 'success',
                    msg: '发表成功',
                    data: result,
                })
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 回复某一条资讯的评论
 * /new/replyComment
 * @param {*} req 
 * @param {*} reply
 */
exports.post_replyComment = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    try {
        let {
            newsCommentId,
            toUserId,
            text
        } = req.body
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '用户未登录或登录失效',
                data: []
            })
        } else {
            const r = await model_newsComment.findOneAndUpdate({_id:newsCommentId} ,{'$push':{replyData:{
                userId,
                toUserId,
                text,
                like:0,
                time:new Date()
            }}},{new:true}).lean()
            const comment = await model_newsComment.findById(newsCommentId).lean()
            let commentUser = await model_userInfo.findById(comment.userId)
                .select({
                    'account': 0
                }).lean()
            comment.user = commentUser
            // 将所有回复用户找出来
            for (let j = 0; j < comment.replyData.length; j++) {
                let replyUser = await model_userInfo.findById(comment.replyData[j].userId)
                    .select({
                        'account': 0
                    }).lean()
                let replyToUser = await model_userInfo.findById(comment.replyData[j].toUserId)
                    .select({
                        'account': 0
                    }).lean()
                comment.replyData[j].replyUser = replyUser
                comment.replyData[j].replyToUser = replyToUser
            }
            const newsId = await model_newsComment.findById(newsCommentId)
            const news = await model_news.findById(newsId.newsId)
                news.statics.comment = news.statics.comment + 1
                news.save((err,r)=>{})
            reply.code(200).send({
                code: 'success',
                msg: '回复成功',
                data: comment
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}