/*
 * @Author: 李国亮 
 * @Date: 2019-04-30 23:16:24 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-06 21:17:17
 */
const model_news = require('../models/news')
const model_userInfo = require('../models/userInfo')
const model_follow = require('../models/follow')
const model_like = require('../models/like')
const model_feedback = require('../models/feedback')
const model_report = require('../models/report')
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
        const r = await model_news.find().sort({
            "statics.view": -1
        }).limit(3)
        for (let i = 0; i < r.length; i++) {
            if (r[i].userId) {
                r[i] = r[i].toObject()
                const user = await model_userInfo.findById(r[i].userId).select({
                    'account': 0
                })
                r[i].user = user.toObject()
            }
        }
        reply.code(200).send({
            code: 'success',
            msg: '',
            data: r
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
        let {
            pageIndex,
            pageSize
        } = req.body
        const r = await model_news.find().sort({
            "createTime": -1
        }).limit(pageSize).skip((pageIndex - 1) * pageSize)
        for (let i = 0; i < r.length; i++) {
            r[i] = r[i].toObject()
            if (r[i].userId) {
                const user = await model_userInfo.findById(r[i].userId).select({
                    'account': 0
                })
                r[i].user = user.toObject()
            }
        }
        reply.code(200).send({
            code: 'success',
            msg: '',
            data: r,
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
 * 通过标题||关键字收搜News
 * /news/rest/searchNews
 * @param {*} req 
 * @param {*} reply
 */
exports.post_searchNews = async (req, reply) => {
    try {
        let {
            pageIndex,
            pageSize,
            keyword,
        } = req.body
        const keywordReg = new RegExp(keyword, 'i')
        const r = await model_news.find({
            $or:[{
                keyword:{$elemMatch:{$regex:keywordReg}}
            },{
                title:{$regex:keywordReg}
            }]
        }).sort({
            "createTime": -1
        }).limit(pageSize).skip((pageIndex - 1) * pageSize)
        for (let i = 0; i < r.length; i++) {
            r[i] = r[i].toObject()
            if (r[i].userId) {
                const user = await model_userInfo.findById(r[i].userId).select({
                    'account': 0
                })
                r[i].user = user.toObject()
            }
        }
        reply.code(200).send({
            code: 'success',
            msg: '',
            data: r,
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
 * 获取用户所有News
 * /news/rest/taNewsList/:userId
 * @param {*} req 
 * @param {*} reply
 */
exports.get_taNews = async (req, reply) => {
    try {
        let {userId} = req.params
        const r = await model_news.find({userId:userId}).select({title:1,_id:1}).lean()
        if(r&&r.length){
            reply.code(200).send({
                code: 'success',
                msg: '获取该作者所有资讯成功',
                data: r,
            })
        }else{
            reply.code(200).send({
                code: 'fail',
                msg: '获取该作者所有资讯失败',
                data: r,
            })
        }      
    } catch (error) {
        throw boom.boomify(error)
    }
}
/**
 * 获取最新的前6新闻资讯
 * /news/rest/hotTopic
 * @param {*} req 
 * @param {*} reply
 */
exports.post_hotTopic = async (req, reply) => {
    try {
        let {
            pageIndex,
            pageSize
        } = req.body
        const r = await model_news.find()
            .sort({
                "statics.comment": -1
            })
            .select({'id':1,'title':1})
            .skip((pageIndex - 1) * pageSize)
            .limit(pageSize)
            .lean()
        reply.code(200).send({
            code: 'success',
            msg: '',
            data: r,
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
 * 获取某一具体新闻详情
 * /news/rest/detail
 * @param {*} req 
 * @param {*} reply
 */
exports.get_newsDetail = async (req, reply) => {
    try {
        let r = await model_news.findById(req.params.newsId)
        if (r.userId) {
            r = r.toObject()
            const user = await model_userInfo.findById(r.userId).select({
                'account': 0
            })
            r.user = user.toObject()
            reply.code(200).send({
                code: 'success',
                msg: '',
                data: r,
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}
/**
 * 获取已登录用户关注列表 
 *
 * @param {*} req
 * @param {*} reply
 */
exports.get_followList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '用户未登录或登录失效'
            })
        } else {
            const r = await model_follow.find({
                user: userId
            }).lean()
            reply.code(200).send({
                msg: '获取用户关注列表成功',
                code: 'success',
                data: r
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}
/**
 * 获取已登录用户点赞列表
 *
 * @param {*} req
 * @param {*} reply
 */
exports.get_likeList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '用户未登录或登录失效',
                data: []
            })
        } else {
            const r = await model_like.find({
                user: userId
            }).lean()
            reply.code(200).send({
                msg: '获取用户点赞列表成功',
                code: 'success',
                data: r
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}
/**
 * 关注,取消关注
 *
 * @param {*} req
 * @param {*} reply
 */
exports.get_follow = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        userFollowed
    } = req.params
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_follow.find({
                user: userId,
                userFollowed: userFollowed
            })
            if (r && r.length) {
                const delUserFollowed = await model_follow.findOneAndDelete({
                    user: userId,
                    userFollowed: userFollowed
                })
                const data = await model_follow.find({
                    user: userId
                }).lean()
                console.log(delUserFollowed)
                reply.code(200).send({
                    msg: '取消关注成功',
                    code: 'success',
                    data: data
                })
            } else {
                new model_follow({
                    user: userId,
                    userFollowed: userFollowed
                }).save(async (err, r) => {
                    if (err) throw err
                    const data = await model_follow.find({
                        user: userId
                    }).lean()
                    reply.code(200).send({
                        msg: '关注成功',
                        code: 'success',
                        data: data
                    })
                    console.log('save a user followed')
                })
            }
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}
/**
 * 关注,取消关注
 *
 * @param {*} req
 * @param {*} reply
 */
exports.get_follow = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        userFollowed
    } = req.params
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_follow.find({
                user: userId,
                userFollowed: userFollowed
            })
            if (r && r.length) {
                const delUserFollowed = await model_follow.findOneAndDelete({
                    user: userId,
                    userFollowed: userFollowed
                })
                const data = await model_follow.find({
                    user: userId
                }).lean()
                console.log(delUserFollowed)
                reply.code(200).send({
                    msg: '取消关注成功',
                    code: 'success',
                    data: data
                })
            } else {
                new model_follow({
                    user: userId,
                    userFollowed: userFollowed
                }).save(async (err, r) => {
                    if (err) throw err
                    const data = await model_follow.find({
                        user: userId
                    }).lean()
                    reply.code(200).send({
                        msg: '关注成功',
                        code: 'success',
                        data: data
                    })
                    console.log('save a user followed')
                })
            }
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 点赞,取消点赞
 *
 * @param {*} req
 * @param {*} reply
 */
exports.get_like = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        newsId
    } = req.params
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_like.findOne({
                user: userId,
                news: newsId
            })
            if (r) {
                if (r.like) {
                    r.like = false
                    r.save(async (err, result) => {
                        const like = await model_like.find({
                            user: userId
                        }).lean()
                        reply.code(200).send({
                            msg: '取消点赞成功',
                            code: 'success',
                            data: like
                        })
                    })
                } else {
                    r.like = true
                    r.save(async (err, result) => {
                        const like = await model_like.find({
                            user: userId
                        }).lean()
                        reply.code(200).send({
                            msg: '点赞成功',
                            code: 'success',
                            data: like
                        })
                    })
                }
            } else {
                new model_like({
                    user: userId,
                    news: newsId,
                    like: true,
                }).save(async (err, r) => {
                    if (err) throw err
                    const like = await model_like.find({
                        user: userId
                    }).lean()
                    reply.code(200).send({
                        msg: '点赞成功',
                        code: 'success',
                        data: like
                    })
                    console.log('save a new like')
                })
            }
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 收藏\取消收藏
 *
 * @param {*} req
 * @param {*} reply
 */
exports.get_collect = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        newsId
    } = req.params
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_like.findOne({
                user: userId,
                news: newsId
            })
            if (r) {
                if (r.collect) {
                    r.collect = false
                    r.save(async (err, result) => {
                        const like = await model_like.find({
                            user: userId
                        }).lean()
                        reply.code(200).send({
                            msg: '取消收藏成功',
                            code: 'success',
                            data: like
                        })
                    })
                } else {
                    r.collect = true
                    r.save(async (err, result) => {
                        const like = await model_like.find({
                            user: userId
                        }).lean()
                        reply.code(200).send({
                            msg: '收藏成功',
                            code: 'success',
                            data: like
                        })
                    })
                }
            } else {
                new model_like({
                    user: userId,
                    news: newsId,
                    collect: true,
                }).save(async (err, r) => {
                    if (err) throw err
                    const like = await model_like.find({
                        user: userId
                    }).lean()
                    reply.code(200).send({
                        msg: '收藏成功',
                        code: 'success',
                        data: like
                    })
                    console.log('save a new like')
                })
            }
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 用户反馈
 *
 * @param {*} req
 * @param {*} reply
 */
exports.post_feedback = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {type,text,link} = req.body
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            new model_feedback({
                user:userId,
                type,
                text,
                link
            }).save((err,r)=>{
                if(err){
                    reply.code(200).send({
                        code:'fail',
                        msg:'反馈失败'
                    })    
                }
                reply.code(200).send({
                    code:'success',
                    msg:'反馈成功'
                })
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 用户举报
 *
 * @param {*} req
 * @param {*} reply
 */
exports.post_report = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {reportedId,type,summary,description} = req.body
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            new model_report({
                reportedId,
                type,
                summary,
                description
            }).save((err,r)=>{
                if(err){
                    reply.code(200).send({
                        code:'fail',
                        msg:'举报失败'
                    })    
                }
                reply.code(200).send({
                    code:'success',
                    msg:'举报成功'
                })
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}