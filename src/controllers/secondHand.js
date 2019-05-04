/*
 * @Author: 李国亮 
 * @Date: 2019-04-30 23:16:24 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-03 07:08:09
 */
const model_secondHand = require('../models/secondHand')
const model_secondHandComment = require('../models/secondHandComment')
const model_userInfo = require('../models/userInfo')
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
            minPrice = 0,
            maxPrice = 1000
        } = req.body
        const r = await model_secondHand.find({
                "price": {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            })
            .populate({
                path:'user',
                select:"-account"
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
                "price": 1
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
                path:'user',
                select:"-account"
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