/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 17:18:55 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-05 17:17:10
 */
// mock 用户信息，account嵌入其中
const mongoose = require('mongoose')
const Mock = require('mockjs')

const model_news = require('../models/news')
const model_userinfo = require('../models/userInfo')
const model_newsComment = require('../models/newsComment')
// 5cbeac4c7a5ae938e13f8c92 2319513900@qq.com ID
var allUsersId = []
async function getUsers(){
	const r = await model_userinfo.find().select({id:1}).lean()
	allUsersId = r.map((d)=>{return d._id.toString()})
	console.log(allUsersId)
}
function mock_more_comment(newsId) {
	for(let i = 0; i < Math.floor(Math.random()*20); i++){
		new model_newsComment(Mock.mock({
			'newsId':newsId,
			'text': Mock.mock('@cword(1, 250)'),
			'like': Mock.mock('@integer(1, 100)'),
			'userId|1': allUsersId,
			'replyData|1-10': [{
				'userId|1':allUsersId,
				'toUserId|1':allUsersId,
				'text':function(){return Mock.mock('@cword(1, 250)')},
				'like':function(){return Mock.mock('@integer(1, 10)')},
				'time':function(){return Mock.mock('@datetime()')},
			}],
		})).save((err) => {
			if (err) throw err
			console.log('mock user comment save')
		})
	}
}

function mock_one_news() {
	let one_mock_news = Mock.mock({
		'title': Mock.mock('@ctitle(3, 50)'),
		'kind|1': ['问答', '学习交流', '推广', '校园资讯','出租','二手'],
		'content': Mock.mock('@cparagraph(30, 100)'),
		cover:'news/news'+(Math.floor(Math.random()*12)+1) + '.jpg',
		'statics': {
			'view':Mock.mock('@integer(1, 10000)'),
			'comment':0,
			'like': Mock.mock('@integer(1, 100)'),
			'collect':Mock.mock('@integer(1, 100)'),
		},
		'createTime':new Date(+new Date() - Math.floor(Math.random()*1000*60*60*24*90)).toISOString(),
		'userId|1':[allUsersId[0],allUsersId[1]],
	})
	let tmp = new Set()
	for(let i = 0; i < Math.floor(Math.random()*10); i++){
		let cur = ['游戏','电影','旅游','恋爱','校园','摄影','古装','吉他','其他','图书馆'][Math.floor(Math.random()*8) + 2]
		// console.log(cur,tmp)
		if(tmp.has(cur)){
			i--
			continue
		}
		tmp.add(cur)
	}
	one_mock_news.keyword = [...tmp]
	new model_news(one_mock_news).save((err,r) => {
		if (err) throw err
		console.log('mock user news save',r.id)
		mock_more_comment(r.id)
	})
	// console.log(one_mock_news)
	// 将这一条News的Id,嵌入所有评
}

async function mock_more_news(number) {
	await getUsers()
	// delete model
	await model_news.remove({},(err) => {
		if (err) throw err
		console.log('remove all news datas');
	})
	await model_newsComment.remove({},(err) => {
		if (err) throw err
		console.log('remove all comment datas');
	})
	for (let i = 0; i < number; i++) {
		mock_one_news()
	}
}

module.exports = mock_more_news