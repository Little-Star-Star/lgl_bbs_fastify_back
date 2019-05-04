/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 17:18:55 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-03 17:28:47
 */
// mock 用户信息，account嵌入其中
const mongoose = require('mongoose')
const Mock = require('mockjs')

const model_secondHand = require('../models/secondHand')
const model_secondHandComment = require('../models/secondHandComment')
// 5cbeac4c7a5ae938e13f8c92 2319513900@qq.com ID
let allUsersId = ['5cbeac4c7a5ae938e13f8c92', '5cbeac4c7a5ae938e13f8c93', '5cbeac4c7a5ae938e13f8c94', '5cbeac4c7a5ae938e13f8c95', '5cbeac4c7a5ae938e13f8c96', '5cbeac4c7a5ae938e13f8c97', '5cbeac4c7a5ae938e13f8c98', '5cbeac4c7a5ae938e13f8c99', '5cbeac4c7a5ae938e13f8c9a', '5cbeac4c7a5ae938e13f8c9b', '5cbf19afc7f08f5a2dc82fc1']

function mock_more_comment(secondHandId) {
	let len = Math.floor(Math.random() * 20);
	for (let i = 0; i < len; i++) {
		new model_secondHandComment(Mock.mock({
			'secondHandId': secondHandId,
			'text': Mock.mock('@cword(1, 250)'),
			'like': Mock.mock('@integer(1, 100)'),
			'userId|1': allUsersId,
			'replyData|1-10': [{
				'userId|1': allUsersId,
				'toUserId|1': allUsersId,
				'text': function () {
					return Mock.mock('@cword(1, 250)')
				},
				'like': function () {
					return Mock.mock('@integer(1, 10)')
				},
				'time': function () {
					return Mock.mock('@datetime()')
				},
			}],
		})).save((err) => {
			if (err) throw err
			console.log('mock user comment save')
		})
	}
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
		'price': function () {
			return Mock.mock('@float(0, 1000, 2,2)')
		},
		'originPrice': function () {
			return Mock.mock('@float(0, 1000, 2,2)')
		},

		'type|1': ['电子产品', '美妆', '服饰', '图书资料', '生活用品', '户外运动','玩具乐器','租房','其他'],
		'statics': {
			'view': Mock.mock('@integer(1, 10000)'),
			'collect': Mock.mock('@integer(1, 100)'),
		},
		'talkPrice':Mock.mock('@boolean()'),
		'address':Mock.mock('@county(true)'),
		'newDegree':Mock.mock('@integer(1, 100)'),
		'dealType|1':['线上','线下'],
		'link':/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
		'description': Mock.mock('@cparagraph(30, 100)'),
		'user|1': ["5cbeac4c7a5ae938e13f8c92", "5cbf19afc7f08f5a2dc82fc1"],
	})).save((err, r) => {
		if (err) throw err
		console.log('mock user second save', r.id)
		mock_more_comment(r.id)
	})
	// console.log(one_mock_news)
	// 将这一条News的Id,嵌入所有评
}

async function mock_more_secondHand(number) {
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