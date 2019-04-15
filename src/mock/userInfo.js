/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 17:18:55 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-04-02 22:33:46
 */
// mock 用户信息，account嵌入其中
const Mock = require('mockjs')

const model_userInfo = require('../models/userInfo')
const idAdd = require('../common/tool').idAdd
const encode = require('../common/tool').encode
const decode = require('../common/tool').decode

function mock_one_userInfo(email){
	new model_userInfo(Mock.mock({
		'id':idAdd(),
		'headSrc':/\/img\/avatar\/[a-zA-Z0-9_\-]{3,10}\.(png|jpg|jpeg)/,
		'nickname':Mock.mock('@cword(3,10)'),
		'sex|1':true,
		'job|1':['学生','老师','电工','码农'],
		'selfDescription':Mock.mock('@cparagraph(1, 3)'),
		'high|150-200':50,
		'weight|40-150':110,
		'faceValue|1':[0,1,2,3,4],
		'birthday':Mock.mock('@date("yyyy-MM-dd")'),
		'city':Mock.mock('@city(true)'),
		'hometown':Mock.mock('@city(true)'),
		'TaInHeart':Mock.mock('@cparagraph(1, 3)'),
		'beautifulImgs|9':[/\/img\/avatar\/[a-zA-Z0-9_\-]{3,10}\.(png|jpg|jpeg)/],
		'account':{
			'mobile': /^1(3|4|5|7|8)\d{9}$/,
			'email': email || Mock.mock('@email()'),
			'psw': encode('light','2319513900@qq.com'),
			'type|1':['admin','user']
		}
	})).save((err)=>{
		if(err) throw err
		console.log('mock user infos save')
	})
}

function mock_userInfo(){
	for(let i = 0; i < 10; i++) {
		mock_one_userInfo()
	}
	mock_one_userInfo("2319513900@qq.com")
}

module.exports = mock_userInfo