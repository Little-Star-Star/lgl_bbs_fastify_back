const Mock = require('mockjs')

const model_userInfo = require('../models/userInfo')

function mock_userInfo(){
	for(let i = 0; i < 10; i++) {
		new model_userInfo(Mock.mock({
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
			'beautifulImgs|9':[/\/img\/avatar\/[a-zA-Z0-9_\-]{3,10}\.(png|jpg|jpeg)/]
		})).save((err)=>{
			if(err) throw err
			console.log('mock user infos save')
		})
	}
}

module.exports = mock_userInfo