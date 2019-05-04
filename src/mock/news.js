/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 17:18:55 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-02 15:21:18
 */
// mock 用户信息，account嵌入其中
const mongoose = require('mongoose')
const Mock = require('mockjs')

const model_news = require('../models/news')
const model_newsComment = require('../models/newsComment')
// 5cbeac4c7a5ae938e13f8c92 2319513900@qq.com ID
let allUsersId = ['5cbeac4c7a5ae938e13f8c92','5cbeac4c7a5ae938e13f8c93','5cbeac4c7a5ae938e13f8c94','5cbeac4c7a5ae938e13f8c95','5cbeac4c7a5ae938e13f8c96','5cbeac4c7a5ae938e13f8c97','5cbeac4c7a5ae938e13f8c98','5cbeac4c7a5ae938e13f8c99','5cbeac4c7a5ae938e13f8c9a','5cbeac4c7a5ae938e13f8c9b','5cbf19afc7f08f5a2dc82fc1']
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
		'userId|1':["5cbeac4c7a5ae938e13f8c92","5cbf19afc7f08f5a2dc82fc1"],
	})
	let tmp = new Set()
	for(let i = 0; i < Math.floor(Math.random()*10); i++){
		let cur = ['游戏','电影','旅游','恋爱','校园','摄影','古装','吉他','其他','图书馆'][Math.floor(Math.random()*8) + 2]
		console.log(cur,tmp)
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

async function mock_20_news() {
	// delete model
	await model_news.remove({},(err) => {
		if (err) throw err
		console.log('remove all news datas');
	})
	await model_newsComment.remove({},(err) => {
		if (err) throw err
		console.log('remove all comment datas');
	})
	for (let i = 0; i < 20; i++) {
		mock_one_news()
	}
}

module.exports = mock_20_news