/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 17:18:55 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-19 01:45:27
 */
// mock 用户信息，account嵌入其中
const mongoose = require('mongoose')
const Mock = require('mockjs')

const model_secondHand = require('../models/secondHand')
const model_userinfo = require('../models/userInfo')
const model_secondHandComment = require('../models/secondHandComment')
// 5cbeac4c7a5ae938e13f8c92 2319513900@qq.com ID
var allUsersId = []
async function getUsers() {
	const r = await model_userinfo.find().select({
		id: 1
	}).lean()
	allUsersId = r.map((d) => {
		return d._id.toString()
	})
	console.log(allUsersId)
}

function mock_more_comment(secondHandId) {
	let hasReply = Math.floor(Math.random() * 5) === 0
	new model_secondHandComment(Mock.mock({
		'secondHand': secondHandId,
		'comments|0-10': [{
			'user|1': allUsersId,
			'text': function () {
				return Mock.mock('@cword(1, 250)')
			},
			'replyText': function () {
				return hasReply ? Mock.mock('@cword(1, 250)') : ''
			},
			'time': function () {
				return Mock.mock('@datetime()')
			},
			'replyTime': function () {
				return hasReply ? Mock.mock('@datetime()') : ''
			},
		}],
	})).save((err) => {
		if (err) throw err
		console.log('mock user comment save')
	})
}

function mock_one_secondHand() {
	new model_secondHand(Mock.mock({
		'covers': function () {
			let covers = [],
				len = Math.floor(Math.random() * 12) + 1;
			for (let i = 0; i < len; i++) {
				covers.push('secondHand/secondHand' + (Math.floor(Math.random() * 12) + 1) + '.jpeg')
			}
			return covers
		},
		'title': Mock.mock('@cword(3,50)'),
		'originPrice': function () {
			return Mock.mock('@float(0, 1000, 2,2)')
		},
		'price': function () {
			let price
			while (true) {
				price = Mock.mock('@float(0, 1000, 2,2)')
				if (price <= this.originPrice) break
			}
			return price
		},
		'type|1': ['电子产品', '美妆', '服饰', '图书资料', '生活用品', '户外运动', '玩具乐器', '租房', '其他'],
		'statics': {
			'view': Mock.mock('@integer(1, 10000)'),
			'collect': Mock.mock('@integer(1, 100)'),
		},
		'talkPrice': Mock.mock('@boolean()'),
		'address': Mock.mock('@county(true)'),
		'newDegree': Mock.mock('@integer(1, 100)'),
		'dealType|1': ['线上', '线下'],
		'link': /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
		'description': Mock.mock('@cparagraph(30, 100)'),
		'createTime': new Date(+new Date() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 90)).toISOString(),
		'user|1': [allUsersId[0], allUsersId[1]],
	})).save((err, r) => {
		if (err) throw err
		console.log('mock user second save', r.id)
		mock_more_comment(r.id)
	})
	// console.log(one_mock_news)
	// 将这一条News的Id,嵌入所有评
}

async function mock_more_secondHand(number) {
	await getUsers()

	// delete model
	await model_secondHand.remove({}, (err) => {
		if (err) throw err
		console.log('remove all secondHand datas');
	})
	await model_secondHandComment.remove({}, (err) => {
		if (err) throw err
		console.log('remove all secondHand\'s comment datas');
	})
	for (let i = 0; i < number; i++) {
		mock_one_secondHand()
	}
}

module.exports = mock_more_secondHand