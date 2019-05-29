/*
 * @Author: 李国亮 
 * @Date: 2019-04-30 23:16:24 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-29 17:23:33
 */
const model_secondHand = require('../models/secondHand')
const model_secondHandComment = require('../models/secondHandComment')
const model_userInfo = require('../models/userInfo')
const model_like = require('../models/likeSecondHand')
const boom = require('boom')
const mongoose = require('mongoose')
/*************************REST***********************/
/**
 * 获取指定页码指定商品个数的二手物品列表
 * /secondHand/rest/list
 * @param {*} req 
 * @param {*} reply
 */
exports.post_secondHandList = async (req, reply) => {
    try {
        let {
            pageIndex,
            pageSize,
            sortType = "price",
            type,
            minPrice = 0,
            maxPrice,
            keyword = '',
        } = req.body
        if (!type.length) type = ['电子产品', '美妆', '服饰', '图书资料', '生活用品', '户外运动', '玩具乐器', '租房', '其他']
        minPrice = minPrice < 0 ? 0 : minPrice
        maxPrice = maxPrice ? maxPrice : 100000000000
        const keywordReg = new RegExp(keyword, "i")
        const total = await model_secondHand.find({
            "price": {
                $gte: minPrice,
                $lte: maxPrice
            },
            "title": {
                $regex: keywordReg
            },
            "type": {
                $in: type
            }
        }).countDocuments()
        let r = await model_secondHand.find({
                "price": {
                    $gte: minPrice,
                    $lte: maxPrice
                },
                "title": {
                    $regex: keywordReg
                },
                "type": {
                    $in: type
                }
            })
            .populate({
                path: 'user',
                select: "-account",
            })
            .sort({
                [sortType]: -1
            })
            .select({
                "statics": 1,
                "id": 1,
                "covers": 1,
                "title": 1,
                "userId": 1,
                "price": 1,
                "type": 1
            })
            .skip((pageIndex - 1) * pageSize)
            .limit(pageSize)
            .lean()
        r = r.filter(d => d.user)
        reply.code(200).send({
            code: 'success',
            msg: '',
            data: r,
            page: {
                pageIndex,
                pageSize,
                total
            }
        })
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 获取指定二手物品的详细信息
 * /secondHand/rest/detail
 * @param {*} req 
 * @param {*} reply
 */
exports.get_secondHandDetail = async (req, reply) => {
    try {
        let {
            itemId
        } = req.params
        const r = await model_secondHand.findById(itemId)
            .populate({
                path: 'user',
                select: "-account"
            })
            .lean()
        reply.code(200).send({
            code: 'success',
            msg: '',
            data: r,
        })
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 获取自己所有所有二手物品
 * /private/secondhand/list
 * @param {*} req 
 * @param {*} reply
 */
exports.post_mySecondHandList = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        pageIndex,
        pageSize,
        keyword = ""
    } = req.body
    const titleReg = new RegExp(keyword, "i")
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_secondHand.find({
                    "user": userId,
                    "title": {
                        $regex: titleReg
                    }
                }).select({
                    covers: 1,
                    title: 1,
                    createTime: 1,
                    _id: 1
                })
                .sort({
                    createTime: -1
                })
                .skip((pageIndex - 1) * pageSize)
                .limit(pageSize)
                .lean()
            const total = await model_secondHand.find({
                "user": userId,
                "title": {
                    $regex: titleReg
                }
            }).countDocuments()
            reply.code(200).send({
                code: 'success',
                msg: '获取个人二手物品列表成功',
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
 * 收藏\取消收藏
 *
 * @param {*} req
 * @param {*} reply
 */
exports.get_collect = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        secondhandId
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
                secondhand: secondhandId
            })
            if (r) {
                if (r.collect) {
                    r.collect = false
                    r.save(async (err, result) => {
                        const like = await model_like.findOne({
                            user: userId,
                            secondhand: secondhandId
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
                        const like = await model_like.findOne({
                            user: userId,
                            secondhand: secondhandId
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
                    secondhand: secondhandId,
                    collect: true,
                }).save(async (err, r) => {
                    if (err) throw err
                    const like = await model_like.findOne({
                        user: userId,
                        secondhand: secondhandId
                    }).lean()
                    reply.code(200).send({
                        msg: '收藏成功',
                        code: 'success',
                        data: like
                    })
                    console.log('save a new like secondhand')
                })
            }
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 获取所有like信息
 *
 * @param {*} req
 * @param {*} reply
 */
exports.get_likeSecondHand = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        secondhandId
    } = req.params
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!',
                data: []
            })
        } else {
            const r = await model_like.findOne({
                user: userId,
                secondhand: secondhandId
            })
            reply.code(200).send({
                msg: '获取所有个人与二手物品的关联数据',
                code: 'success',
                data: r
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
exports.post_modifySecondHand = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        secondhandId,
        covers,
        title,
        type,
        talkPrice,
        address,
        newDegree,
        dealType,
        link,
        description,
        originPrice,
        price
    } = req.body
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_secondHand.findOneAndUpdate({
                _id: secondhandId
            }, {
                covers,
                title,
                type,
                talkPrice,
                address,
                newDegree,
                dealType,
                link,
                description,
                originPrice,
                price
            })
            if(r){
                reply.code(200).send({
                    code: 'success',
                    msg: '修改二手物品成功'
                })
            }else{
                reply.code(201).send({
                    code: 'fail',
                    msg: '修改失败'
                })
            }
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
exports.post_deleteSecondHand = async (req, reply) => {
    const userId = req.session ? req.session.userId : ''
    let {
        secondHandId,
    } = req.params
    try {
        if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!'
            })
        } else {
            const r = await model_secondHand.findOneAndDelete({
                _id: secondHandId
            })
            reply.code(200).send({
                code: 'success',
                msg: '删除二手物品成功'
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}