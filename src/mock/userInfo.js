/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 17:18:55 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-04-23 13:54:10
 */
// mock 用户信息，account嵌入其中
const Mock = require('mockjs')

const model_userInfo = require('../models/userInfo')
const model_account = require('../models/account')
const idAdd = require('../common/tool').idAdd
const encode = require('../common/tool').encode
const decode = require('../common/tool').decode

let first = true

function mock_one_account() {
	let type = 'user',
		email
	if (first) {
		first = false
		type = 'admin'
		email = '2319513900@qq.com'
	}
	let account = Mock.mock({
		type,
		'mobile': /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
		'email': email || /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
	})
	account.psw = encode('123456', account.email)
	return account
}

function mock_one_userInfo() {
	new model_userInfo(Mock.mock({
		'avatar': 'lij_circle_logo.png',
		'name': 'LIJ_BBS_' + idAdd(),
		'specialty|1': ['软件工程', '计算机科学与技术', '信息安全', '心理学'],
		'description': Mock.mock('@ctitle(50, 250)'),
		'account': mock_one_account()
	})).save((err) => {
		if (err) throw err
		console.log('mock user infos save')
	})
}

async function mock_userInfo() {
	// delete model
	await model_userInfo.remove((err) => {
		if (err) throw err
		console.log('remove all userinfo datas');
	})
	for (let i = 0; i < 10; i++) {
		mock_one_userInfo()
	}
}

module.exports = mock_userInfo