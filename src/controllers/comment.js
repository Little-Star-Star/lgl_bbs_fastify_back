/*
 * @Author: 李国亮 
 * @Date: 2019-04-30 23:16:24 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-02 14:39:28
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
            .limit(pageSize)
            .skip((pageIndex - 1) * pageSize)
            .sort({
                sortType: -1
            })
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