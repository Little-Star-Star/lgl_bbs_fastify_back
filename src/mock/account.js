const Mock = require('mockjs')

const model_account = require('../models/account')
const idAdd = require('../common/tool').idAdd

const crypto = require('crypto')
const encode = function () {
	return crypto.createHmac('sha256', 'light')
		.update('i love xujia')
		.digest('hex')
}

module.exports = function mock_account() {
	// for (let i = 0; i < 10; i++) {
		new model_account(Mock.mock({
			'id': idAdd(),
			'mobile': /^1(3|4|5|7|8)\d{9}$/,
			'email': Mock.mock('@email()'),
			'psw': encode(),
			'type|1':['admin','user']
		})).save((err) => {
			if (err) throw err
			console.log('mock account save')
		})
	// }
}
