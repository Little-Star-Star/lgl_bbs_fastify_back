/*
 * @Author: 李国亮 
 * @Date: 2019-04-02 22:08:52 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-04-23 15:09:33
 */
const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
		type: { type: String,enum:['admin','user']}, //admin || user
		mobile: { type: String ,match:/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/}, //手机号码
		email: { type: String ,match:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/}, //邮箱
		psw: { type: String,minlength:44,maxlength:44}, //密码，加密模式-...
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = mongoose.model('Account',accountSchema,'account')