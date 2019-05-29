/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 17:18:55 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-30 02:04:02
 */
// mock 个人用户数据
const Mock = require('mockjs')

const model_me = require('../models/me')
const model_news = require('../models/news')
const model_secondHand = require('../models/secondHand')
const model_userInfo = require('../models/userInfo')

let allNews, allSecondHands


async function mock_one_me() {
	allNews = await model_news.find({}, {
		id: 1
	}).lean()
	allSecondHands = await model_secondHand.find({}, {
		id: 1
	}).lean()
	const userId = await model_userInfo.findOne({
			'account.email': '2319513900@qq.com'
		})
		.select({
			_id: 1
		}).lean()
	// console.log(allNews, allSecondHands, userId._id.toString())
	let viewArr = []
	for(let i = 0; i < 23 ; i++){
		let type = Math.floor(Math.random()*2),randomNewsId,randomSecondHandId
		if(type === 0){
			randomNewsId = allNews[Math.floor(Math.random()*allNews.length)]._id
		}else if(type === 1){
			randomSecondHandId = allSecondHands[Math.floor(Math.random()*allSecondHands.length)]._id
		}
		viewArr.push({
			type:type,
			'itemId':type===0 ? randomNewsId : randomSecondHandId
		})
	}
	// console.log(viewArr)
	new model_me({
		'user': userId._id,
		'views': viewArr
	}).save((err) => {
		if (err) throw err
		console.log('mock me infos save')
	})
}

async function mock_me() {
	// delete model
	await model_me.remove((err) => {
		if (err) throw err
		console.log('remove all me datas');
	})
	await mock_one_me()
}

module.exports = mock_me