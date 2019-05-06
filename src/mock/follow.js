/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 17:18:55 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-06 22:30:13
 */
// mock 用户信息，account嵌入其中
const Mock = require('mockjs')

const model_follow = require('../models/follow')
const model_userinfo = require('../models/userInfo')
var allUsersId = []
var add = 1
async function getUsers(){
	const r = await model_userinfo.find().select({id:1}).lean()
	allUsersId = r.map((d)=>{return d._id.toString()})
	console.log(allUsersId)
}
function mock_one_follow() {
	new model_follow({
		user:allUsersId[0],
		userFollowed:allUsersId[add++]
	}).save((err) => {
		if (err) throw err
		console.log('mock user follow save')
	})
}

async function mock_more_follow(n) {
	await getUsers()
	// delete model
	await model_follow.remove((err) => {
		if (err) throw err
		console.log('remove all follow datas');
	})
	for (let i = 0; i < n; i++) {
		mock_one_follow()
	}
}

module.exports = mock_more_follow