/*
 * @Author: 李国亮 
 * @Date: 2019-04-30 23:16:24 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-31 23:57:40
 */
const model_news = require('../models/news')
const model_secondHand = require('../models/secondHand')
const model_userInfo = require('../models/userInfo')
const model_follow = require('../models/follow')
const model_like = require('../models/like')
const model_likeSecondHand = require('../models/likeSecondHand')
const model_feedback = require('../models/feedback')
const model_report = require('../models/report')
const model_me = require('../models/me')
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
            $or: [{
                keyword: {
                    $elemMatch: {
                        $regex: keywordReg
                    }
                }
            }, {
                title: {
                    $regex: keywordReg
                }
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
        let {
            userId
        } = req.params
        const r = await model_news.find({
            userId: userId
        }).select({
            title: 1,
            _id: 1
        }).lean()
        if (r && r.length) {
            reply.code(200).send({
                code: 'success',
                msg: '获取该作者所有资讯成功',
                data: r,
            })
        } else {
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
 * 获取自己所有所有News
 * /private/news/list
 * @param {*} req 
 * @param {*} reply
 */
exports.post_myNewsList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        pageIndex,
        pageSize,
        keyword
    } = req.body
    const titleReg = new RegExp(keyword, "i")
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_news.find({
                    "userId": userId,
                    "title": {
                        $regex: titleReg
                    }
                }).select({
                    cover: 1,
                    title: 1,
                    createTime: 1,
                    _id: 1
                }).sort({
                    createTime: -1
                })
                .skip((pageIndex - 1) * pageSize)
                .limit(pageSize)
                .lean()
            const total = await model_news.find({
                "userId": userId,
                "title": {
                    $regex: titleReg
                }
            }).countDocuments()
            reply.code(200).send({
                code: 'success',
                msg: '获取个人校园资讯列表成功',
                data: r,
                page: {
                    pageIndex,
                    pageSize,
                    total
                }
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}
/**
 * 获取所有News admin
 * /private/admin/news/list
 * @param {*} req 
 * @param {*} reply
 */
exports.post_adminNewsList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    const adminUser = await model_userInfo.findById(userId)
    if (adminUser && adminUser.account && adminUser.account.type === 'admin') {
        let {
            pageIndex,
            pageSize,
            keyword
        } = req.body
        const titleReg = new RegExp(keyword, "i")
        try {
            if (!req.userLogin || !userId) {
                reply.code(201).send({
                    code: 'fail',
                    msg: '您还未登录,请登录!'
                })
            } else {
                const r = await model_news.find({
                        "title": {
                            $regex: titleReg
                        }
                    }).select({
                        cover: 1,
                        title: 1,
                        createTime: 1,
                        _id: 1
                    }).sort({
                        createTime: -1
                    })
                    .skip((pageIndex - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                const total = await model_news.find({
                    "title": {
                        $regex: titleReg
                    }
                }).countDocuments()
                reply.code(200).send({
                    code: 'success',
                    msg: '获取所有校园资讯列表成功',
                    data: r,
                    page: {
                        pageIndex,
                        pageSize,
                        total
                    }
                })
            }
        } catch (error) {
            throw boom.boomify(error)
        }
    } else {
        reply.code(201).send({
            code: 'fail',
            msg: '请使用管理员账号登录!'
        })
    }

}

/**
 * 获取所有举报 admin
 * /private/admin/report/list
 * @param {*} req 
 * @param {*} reply
 */
exports.post_adminReportList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    const adminUser = await model_userInfo.findById(userId)
    if (adminUser && adminUser.account && adminUser.account.type === 'admin') {
        let {
            pageIndex,
            pageSize,
        } = req.body
        try {
            if (!req.userLogin || !userId) {
                reply.code(201).send({
                    code: 'fail',
                    msg: '您还未登录,请登录!'
                })
            } else {
                const total = await model_report.find().countDocuments()
                const r = await model_report.find({})
                    .skip((pageIndex - 1) * pageSize)
                    .limit(pageSize).sort({
                        updateTime: -1
                    }).lean()
                for (let i = 0; i < r.length; i++) {
                    if (r[i].type === 'news') {
                        let r1 = await model_news.findById(r[i].reportedId)
                            .populate({
                                path: 'userId',
                                select: {
                                    account: 0
                                }
                            }).lean()
                        if (r1) {
                            r[i].news = r1
                        }
                    } else if (r[i].type === 'secondhand') {
                        let r1 = await model_secondHand.findById(r[i].reportedId)
                            .populate({
                                path: 'user',
                                select: {
                                    account: 0
                                }
                            }).lean()
                        if (r1) {
                            r[i].secondhand = r1
                        }
                    }
                }
                reply.code(200).send({
                    code: 'success',
                    msg: '获取举报列表成功',
                    data: r,
                    page: {
                        pageIndex,
                        pageSize,
                        total
                    }
                })

            }
        } catch (error) {
            throw boom.boomify(error)
        }
    } else {
        reply.code(201).send({
            code: 'fail',
            msg: '请使用管理员账号登录!'
        })
    }
}

/**
 * 获取所有反馈 admin
 * /private/admin/feedback/list
 * @param {*} req 
 * @param {*} reply
 */
exports.post_adminFeedbakcList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    const adminUser = await model_userInfo.findById(userId)
    if (adminUser && adminUser.account && adminUser.account.type === 'admin') {
        let {
            pageIndex,
            pageSize,
        } = req.body
        try {
            if (!req.userLogin || !userId) {
                reply.code(201).send({
                    code: 'fail',
                    msg: '您还未登录,请登录!'
                })
            } else {
                const total = await model_feedback.find().countDocuments()
                const r = await model_feedback.find({}).populate({
                    path: 'user',
                    select: {
                        account: 0
                    }
                }).skip((pageIndex - 1) * pageSize).limit(pageSize).lean()
                reply.code(200).send({
                    code: 'success',
                    msg: '获取反馈列表成功',
                    data: r,
                    page: {
                        pageIndex,
                        pageSize,
                        total
                    }
                })
            }
        } catch (error) {
            throw boom.boomify(error)
        }
    } else {
        reply.code(201).send({
            code: 'fail',
            msg: '请使用管理员账号登录!'
        })
    }
}

/**
 * 删除所有反馈 admin
 * /private/admin/feedback/delete
 * @param {*} req 
 * @param {*} reply
 */
exports.get_adminFeedbackDelete = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    const adminUser = await model_userInfo.findById(userId)
    if (adminUser && adminUser.account && adminUser.account.type === 'admin') {
        try {
            if (!req.userLogin || !userId) {
                reply.code(201).send({
                    code: 'fail',
                    msg: '您还未登录,请登录!'
                })
            } else {
                await model_feedback.remove((err) => {
                    if (err) console.log(err)
                    console.log('remove all feedback success')
                })
                reply.code(200).send({
                    code: 'success',
                    msg: '清空所有反馈成功',
                })
            }
        } catch (error) {
            throw boom.boomify(error)
        }
    } else {
        reply.code(201).send({
            code: 'fail',
            msg: '请使用管理员账号登录!'
        })
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
            .select({
                'id': 1,
                'title': 1
            })
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
    const userId = req.session ? req.session.userId : ''
    let {
        newsId
    } = req.params
    try {
        let r = await model_news.findById(newsId)
            ++r.statics.view;
        if (userId) {
            // 浏览记录
            let me = await model_me.findOne({
                'user': userId
            })
            if (!me) {
                me = new model_me({
                    user: userId,
                    views: [{
                        time: new Date(),
                        type: 0,
                        itemId: newsId
                    }]
                })
            } else {
                me.views.unshift({
                    type: 0,
                    itemId: newsId
                })
            }
            me.save((err, product) => {
                if (err) console.log(err)
                console.log('save view success')
            })
        }
        r.save(async (err, product) => {
            if (err) console.log(err)
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
        })
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
    let {
        type,
        text,
        link
    } = req.body
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            new model_feedback({
                user: userId,
                type,
                text,
                link
            }).save((err, r) => {
                if (err) {
                    reply.code(200).send({
                        code: 'fail',
                        msg: '反馈失败'
                    })
                }
                reply.code(200).send({
                    code: 'success',
                    msg: '反馈成功'
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
    let {
        reportedId,
        type,
        summary,
        description
    } = req.body
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            if (type === 'news') {
                let like = await model_like.findOne({
                    user: userId,
                    news: reportedId
                })
                if (!like) {
                    like = new model_like({
                        news: reportedId,
                        comment: [],
                        report: {
                            text: description,
                            time: new Date()
                        }
                    })
                } else {
                    like.report = {
                        text: description,
                        time: new Date()
                    }
                }
                like.save((err, product) => {
                    if (err) console.log(err)
                    console.log('save report of news to Like Collect')
                })
            } else if (type === 'secondhand') {
                let like = await model_likeSecondHand.findOne({
                    user: userId,
                    secondhand: reportedId
                })
                if (!like) {
                    like = new model_likeSecondHand({
                        secondhand: reportedId,
                        comment: [],
                        report: {
                            text: description,
                            time: new Date()
                        }
                    })
                } else {
                    like.report = {
                        text: description,
                        time: new Date()
                    }
                }
                like.save((err, product) => {
                    if (err) console.log(err)
                    console.log('save report of news to Like Collect')
                })
            }
            new model_report({
                reportedId,
                type,
                summary,
                description
            }).save((err, r) => {
                if (err) {
                    reply.code(200).send({
                        code: 'fail',
                        msg: '举报失败'
                    })
                }
                reply.code(200).send({
                    code: 'success',
                    msg: '举报成功'
                })
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 修改校园资讯
 *
 * @param {*} req
 * @param {*} reply
 */
exports.post_modifyNews = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        newsId,
        title,
        kind,
        cover,
        keyword,
        content
    } = req.body
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_news.findOneAndUpdate({
                _id: newsId
            }, {
                title,
                kind,
                cover,
                keyword,
                content
            })
            reply.code(200).send({
                code: 'success',
                msg: '修改校园资讯成功'
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 删除校园资讯
 *
 * @param {*} req
 * @param {*} reply
 */
exports.post_deleteNews = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    const adminUser = await model_userInfo.findById(userId)
    let {
        newsId,
    } = req.params
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            let options = {
                _id: newsId,
                userId
            }
            if (adminUser && adminUser.account && adminUser.account.type === 'admin') {
                delete options.userId
            }
            const r = await model_news.findOneAndDelete(options)
            reply.code(200).send({
                code: 'success',
                msg: '删除校园资讯成功'
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 获取自己所有所有浏览记录
 * /private/view/list
 * @param {*} req 
 * @param {*} reply
 */
exports.post_myViewList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        pageIndex = 1,
            pageSize = 10,
    } = req.body
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_me.findOne({
                user: userId
            }).lean()
            let arr = []
            if (r && r.views) {
                for (let i = (pageIndex - 1) * pageSize; i < pageIndex * pageSize && i < r.views.length; i++) {
                    let r1 = ''
                    if (r.views[i].type === 0) {
                        r1 = await model_news.findById(r.views[i].itemId)
                            .select({
                                _id: 1,
                                cover: 1,
                                title: 1,
                                kind: 1,
                            })
                            .sort({
                                createTime: -1
                            }).lean()
                    } else if (r.views[i].type === 1) {
                        r1 = await model_secondHand.findById(r.views[i].itemId)
                            .select({
                                _id: 1,
                                covers: 1,
                                title: 1,
                                type: 1
                            })
                            .sort({
                                createTime: -1
                            }).lean()
                        r1.covers = r1.covers && r1.covers.length ? r1.covers[0] : 'lij_logo_circle.png'
                    }
                    r1.createTime = r.views[i].time
                    arr.push(r1)
                }
            } else {
                arr = []
            }
            reply.code(200).send({
                code: 'success',
                msg: '获取个人浏览记录成功',
                data: arr,
                page: {
                    pageIndex,
                    pageSize,
                    total: r && r.views && r.views.length ? r.views.length : 0
                }
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 获取自己所有关注的人
 * /private/followTa/list
 * @param {*} req 
 * @param {*} reply
 */
exports.post_myFollowTaList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        pageIndex = 1,
            pageSize = 20,
    } = req.body
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const total = await model_follow.find({
                user: userId
            }).countDocuments()
            const r = await model_follow.find({
                    user: userId
                })
                .populate('userFollowed', {
                    'account': 0
                })
                .limit(pageSize)
                .skip((pageIndex - 1) * pageSize)
                .sort({
                    createTime: -1
                })
            if (r) {
                reply.code(200).send({
                    code: 'success',
                    msg: '获取个人关注列表成功',
                    data: r,
                    page: {
                        pageIndex,
                        pageSize,
                        total
                    }
                })
            }
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}


/**
 * 获取所有关注自己的人
 * /private/followMe/list
 * @param {*} req 
 * @param {*} reply
 */
exports.post_myFollowMeList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        pageIndex = 1,
            pageSize = 20,
    } = req.body
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const total = await model_follow.find({
                userFollowed: userId
            }).countDocuments()
            const r = await model_follow.find({
                    userFollowed: userId
                })
                .populate('user', {
                    'account': 0
                })
                .limit(pageSize)
                .skip((pageIndex - 1) * pageSize)
                .sort({
                    createTime: -1
                })
            if (r) {
                reply.code(200).send({
                    code: 'success',
                    msg: '获取个人关注列表成功',
                    data: r,
                    page: {
                        pageIndex,
                        pageSize,
                        total
                    }
                })
            }
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}
/**
 * 清空自己所有浏览记录
 * /private/view/delete
 * @param {*} req 
 * @param {*} reply
 */
exports.get_deleteMyViewList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_me.findOneAndDelete({
                user: userId
            })
            reply.code(200).send({
                code: 'success',
                msg: '清空个人浏览记录成功',
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 *  获取所有收藏（二手物品+校园资讯）
 * /private/allCollect/list
 * @param {*} req 
 * @param {*} reply
 */
exports.get_myAllCollectList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        keyword = "",
    } = req.body || {}
    let titleRegex = new RegExp(keyword, 'i')
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            let r1 = await model_like.find({
                    user: userId
                })
                .populate({
                    path: 'user',
                    select: {
                        account: 0
                    }
                })
                .populate({
                    path: 'news',
                    match: {
                        title: {
                            $regex: titleRegex
                        }
                    },
                    select: {
                        _id: 1,
                        title: 1,
                        kind: 1,
                        cover: 1,
                        createTime: 1,
                    }
                })
                .sort({
                    updateTime: -1
                }).lean()

            let r2 = await model_likeSecondHand.find({
                    user: userId
                })
                .populate({
                    path: 'user',
                    select: {
                        account: 0
                    }
                })
                .populate({
                    path: 'secondhand',
                    match: {
                        title: {
                            $regex: titleRegex
                        }
                    },
                    select: {
                        _id: 1,
                        title: 1,
                        type: 1,
                        covers: 1,
                        createTime: 1,
                    }
                })
                .sort({
                    updateTime: -1
                }).lean()
            r1 = r1.filter(d => {
                return d.news
            })
            r2 = r2.filter((d) => {
                if (d.secondhand)
                    d.secondhand.covers = d.secondhand.covers && d.secondhand.covers.length ? d.secondhand.covers[0] : 'lij_circle_logo.png'
                return d.secondhand
            })
            let r = [...r1, ...r2]
            reply.code(200).send({
                code: 'success',
                msg: '获取我的收藏成功',
                data: r
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

// /**
//  * 获取所有举报内容 
//  * /private/report/list
//  * @param {*} req 
//  * @param {*} reply
//  */
// exports.post_myReportList = async (req, reply) => {
//     const userId = req.session ? req.session.userId : ''
//     let {
//         pageIndex = 1,
//             pageSize = 20,
//     } = req.body
//     try {
//         if (!req.userLogin || !userId) {
//             reply.code(201).send({
//                 code: 'fail',
//                 msg: '您还未登录,请登录!'
//             })
//         } else {
//                 const r = await model_report.find
//                 reply.code(200).send({
//                     code: 'success',
//                     msg: '获取个人举报列表成功',
//                     data: r,
//                 })
//         }
//     } catch (error) {
//         throw boom.boomify(error)
//     }
// }