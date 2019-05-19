/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 17:18:55 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-18 16:21:57
 */
// mock 用户信息，account嵌入其中
const Mock = require('mockjs')

const model_like = require('../models/likeSecondHand')
const model_userinfo = require('../models/userInfo')
const model_secondhand = require('../models/secondHand')
var allUsersId = []
var allNewsId = []
var add = 1
async function getUsers() {
	const r = await model_userinfo.find().select({
		id: 1
	}).lean()
	allUsersId = r.map((d) => {
		return d._id.toString()
	})
	console.log(allUsersId)
}
async function getSecondHand() {
	const r = await model_secondhand.find().select({
		id: 1
	}).limit(10).lean()
	allNewsId = r.map((d) => {
		return d._id.toString()
	})
	console.log(allNewsId)
}

function mock_one_like() {
	new model_like(Mock.mock({
		user: allUsersId[0],
		secondhand: allNewsId[add++],
		collect: true,
		"comment|0-10": [{
			'text': function () {
				return Mock.mock('@cword(1, 50)')
			},
			'time': function () {
				return new Date(+new Date() - Math.floor(Math.random()*1000*60*60*24*90)).toISOString()
			},
		}],
		"report": {
			'text': function () {
				return Mock.mock('@cword(1, 50)')
			},
			'time': function () {
				return new Date(+new Date() - Math.floor(Math.random()*1000*60*60*24*90)).toISOString()
			},
		}
	})).save((err) => {
		if (err) throw err
		console.log('mock user like secondhand save')
	})
}

async function mock_more_like(n) {
	await getUsers()
	await getSecondHand()
	// delete model
	await model_like.remove((err) => {
		if (err) throw err
		console.log('remove all like secondhand datas');
	})
	for (let i = 0; i < n; i++) {
		mock_one_like()
	}
}

module.exports = mock_more_like