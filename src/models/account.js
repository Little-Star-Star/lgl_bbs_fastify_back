const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
		id: { type: Number }, //账号id
		mobile: { type: String }, //手机号码
		email: { type: String }, //邮箱
		psw: { type: String }, //密码，加密模式-...
		type: { type: String} //admin || user
})

module.exports = mongoose.model('Account',accountSchema,'account')