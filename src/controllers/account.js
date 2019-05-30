/*
 * @Author: 李国亮 
 * @Date: 2019-04-02 22:00:19 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-30 18:31:59
 */
const {isPhone,encode,decode,sixNumber,generateCode} = require('../common/tool')

const boom = require('boom')
const model_userInfo = require('../models/userInfo')

let mostNewSixNumberMailCode = '' //最新的6位数字邮箱验证码
let mostNewSixNumberMailCodeTime = 0 //最新的6位数字邮箱验证码生成时间
global.accountMailCodeMap = new Map()

/************************根index页面***********************/
exports.html_index = async (req, reply) => {
	try {
		reply
			.code(200)
			.header('Content-Type', 'text/html;charset="utf-8"')
			.sendFile('index.html')
		console.log(reply.sent)
	} catch (error) {
		throw boom.boomify(error)
	}
}

/*************************REST***********************/
/**
 * 使用手机验证码进行登录
 * /account/rest/loginWithCode
 * @param {*} req
 * @param {*} reply
 */
exports.post_loginWithCode = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 使用账号+密码登录
 * /account/rest/loginWithPassword
 * @param {*} req
 * @param {*} reply
 */
exports.post_loginWithPassword = async (req, reply) => {
	try {
		console.log(req.body);
		// 服务器端留session，进行标识，发送cookie给客户端
		let {
			account,
			password
		} = req.body
		let type = isPhone(account) ? 'mobile' : 'email'
		const data = await model_userInfo.find({['account.'+type]:account})
		let accountData = '' 
		data.forEach((d)=>{
			if(decode(d.account.psw,d.account[type])===decode(password,account)){
				accountData = d
				req.session.userId = accountData.id
			}
		})
		if(accountData){
			req.sessionStore.set(req.session.sessionId,req.session,()=>{return})
			delete accountData.account.psw
			reply
				.code(200)
				// .header('Access-Control-Allow-Credentials', true)
				// .header('Access-Control-Allow-Origin', 'http://localhost:8081')
				.setCookie('userlogin',req.session.encryptedSessionId,{
					path:'/',
					// domain:'lightlovexujia.top',
					maxAge:1000 * 60 * 15
				})
				.send({
					code: 'success',
					msg: '登录成功',
					data:accountData,
				})
		}else if(!data.length){
			reply
				.code(201)
				.send({
					code: 'fail',
					msg: '账号不存在'
				})
		}else{
			reply
			.code(202)
			.send({
				code:'fail',
				msg:'密码错误'
			})
		}
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 忘记密码，重新设置新密码
 * /rest/forgetPassword
 * @param {*} req
 * @param {*} reply
 */
exports.post_forgetPassword = async (req, reply) => {
	try {
		let {account,code,password} = req.body
		// 没发验证码
		if(!accountMailCodeMap.get(account)){
			reply
				.code(201)
				.send({
					code:'fail',
					msg:'没有发送验证码'
				})    
			return
		}
		let mostNewCode = accountMailCodeMap.get(account).mostNewSixNumberMailCode
		// 2分钟失效时间
		let codeTimeOut = ((+new Date()) - accountMailCodeMap.get(account).mostNewSixNumberMailCodeTime) > 1000 * 60 * 15
		if(code !== mostNewCode){
			reply
				.code(201)
				.send({
					code:'fail',
					msg:'验证码错误'
				})
				return
			
		}
		if(codeTimeOut){
			reply
				.code(202)
				.send({
					code:'fail',
					msg:'验证码失效'
				})
				return
		}
		const exist = await model_userInfo.findOne({'account.email':account})
		console.log(exist);
		if(!exist.id){
			reply
				.code(203)
				.send({
					code:'fail',
					msg:'该用户不存在'
				})
				return
		}
		// 修改密码
		const r = await model_userInfo.updateOne(
			{'account.email':account},{'account.psw':password}
		)
		console.log(r);
		if(r.ok){
			delete exist.account.psw
			reply
				.code(200)
				.send({
					code:'success',
					msg:'找回密码成功',
					data:exist
				})
				return

		}else{
			reply
				.code(204)
				.send({
					code:'fail',
					msg:'找回密码失败'
				})
				return
		}
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 检查账号是否已经注册
 * /rest/account/existed/:account
 * @param {*} req
 * @param {*} reply
 */
exports.get_account_existed = async (req, reply) => {
	try {
		
		console.log(req.params.account)
		const exist = await model_userInfo.find({'account.email':req.params.account}).count()
		console.log(exist);
		if(exist){
			reply
				.code(203)
				.send({
					code:'fail',
					msg:'该账号已经注册'
				})
		}
		reply
			.code(200)
			.send({
				code:'success',
				msg:'该账号不存在'
			})
	} catch (error) {
		throw boom.boomify(error)
	}
}

/**
 * 注册
 * /account/rest/regester
 * @param {*} req
 * @param {*} reply
 */
exports.post_register = async (req, reply) => {
	try {
		let {account,code,password} = req.body
		// 没发验证码
		if(!accountMailCodeMap.get(account)){
			reply
				.code(201)
				.send({
					code:'fail',
					msg:'没有发送验证码'
				})    
			return
		}
		let mostNewCode = accountMailCodeMap.get(account).mostNewSixNumberMailCode
		// 2分钟失效时间
		let codeTimeOut = ((+new Date()) - accountMailCodeMap.get(account).mostNewSixNumberMailCodeTime) > 1000 * 60 * 15
		if(code !== mostNewCode){
			reply
				.code(201)
				.send({
					code:'fail',
					msg:'验证码错误'
				})
				return
			
		}
		if(codeTimeOut){
			reply
				.code(202)
				.send({
					code:'fail',
					msg:'验证码失效'
				})
			return
		}
		const exist = await model_userInfo.find({'account.email':account}).count()
		console.log(exist);
		if(exist){
			reply
				.code(203)
				.send({
					code:'fail',
					msg:'该用户已存在'
				})
				return
		}
		const r = await model_userInfo.insertMany({
			name:'lij_'+sixNumber(),
			specialty:'',
			description:'他很懒，什么都没写...',
			account:{
				type:'user',
				email:account,
				psw:password
			}
		})
		console.log(r);
		if(r.length){
			delete r[0].account.psw
			reply
				.code(200)
				.send({
					code:'success',
					msg:'注册成功',
					data:r[0]
				})
				return

		}else{
			reply
				.code(204)
				.send({
					code:'fail',
					msg:'注册失败'
				})
				return
		}
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 发送验证码
 * /account/rest/sendMailCode
 * @param {*} req
 * @param {*} reply
 */
exports.post_sendMailCode = async (req, reply) => {
	try {
		let {account} = req.body
		console.log(account);
		mostNewSixNumberMailCodeTime = +new Date()
		mostNewSixNumberMailCode = sixNumber()
		accountMailCodeMap.set(account,{
			mostNewSixNumberMailCode,
			mostNewSixNumberMailCodeTime
		})
		const r = generateCode(account,mostNewSixNumberMailCode)
		console.log(r)
		if(r === 'error'){
			reply
				.code(201)
				.send({
					code:'fail',
					msg:'发送失败'
				})
		}else{
			reply
			.code(200)
			.send({
				code:'success',
				msg:'发送成功'
			})
		}
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 依据cookie的token字段获取自身信息
 *	/account/rest/selfInfoByToken/{token}
 * @param {*} req
 * @param {*} reply
 */
exports.get_selfInfoByToken = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}

/*************************PRIVATE-REST***********************/
/**
 * 绑定手机号或邮箱
 * /account/private/rest/bindAccount
 * @param {*} req
 * @param {*} reply
 */
exports.post_private_bindAccount = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 修改已绑定的手机号或邮箱
 * /account/private/rest/updateBindedAccount
 * @param {*} req
 * @param {*} reply
 */
exports.post_private_updateBindedAccount = async (req, reply) => {
	// 1:修改加密的账号密码,先用老账号解码,在使用新账号加码
	// 2:更新邮箱
	const userId = req.session ? req.session.userId : ''
	try {
		if(!req.userLogin||!userId){
			reply.code(201).send({
				code:'fail',
				msg:'用户未登录或登录失效'			
			})
		}else{
			let {newAccount,newCode,oldAccount,oldCode} = req.body
			let mostNewNewAccountCode = accountMailCodeMap.get(newAccount)
			let mostNewOldAccountCode = accountMailCodeMap.get(oldAccount)
			if(((+new Date()) - mostNewNewAccountCode.mostNewSixNumberMailCodeTime) > 1000 * 60 * 15
				||((+new Date()) - mostNewOldAccountCode.mostNewSixNumberMailCodeTime) > 1000 * 60 * 15
			){
				reply.code(201).send({
					code:'fail',
					msg:'验证码失效'
				})
				return
			}
			if(newCode != mostNewNewAccountCode.mostNewSixNumberMailCode 
				|| oldCode != mostNewOldAccountCode.mostNewSixNumberMailCode
			){
				reply.code(201).send({
					code:'fail',
					msg:'验证码不正确'
				})
				return
			}
			const curUser = await model_userInfo.findById(userId)
			console.log(curUser)
			let newPsw =encode(decode(curUser.account.psw,oldAccount),newAccount)
			const updatedUser = await model_userInfo.findByIdAndUpdate(userId,{$set:{'account.psw':newPsw,'account.email':newAccount}})
			if(updatedUser.account){
				req.sessionStore.set(req.session.sessionId,req.session,()=>{return})
				delete updatedUser.account.psw
				reply.code(200).setCookie('userlogin',req.session.encryptedSessionId,{
					path:'/',
					maxAge:1000 * 60 * 15
				}).send({
					code:'success',
					msg:'修改邮箱成功',	
					data:updatedUser		
				})
			}
		}
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 修改密码
 * /account/private/rest/updatePassword
 * @param {*} req
 * @param {*} reply
 */
exports.post_private_updatePassword = async (req, reply) => {
	const userId = req.session ? req.session.userId : ''
	try {
		if(!req.userLogin||!userId){
			reply.code(201).send({
				code:'fail',
				msg:'用户未登录或登录失效'			
			})
		}else{
			let {newPsw,oldPsw} = req.body
			const curUser = await model_userInfo.findById(userId)
			console.log(curUser)
			// 旧密码不正确
			if(decode(curUser.account.psw,curUser.account.email) !== decode(oldPsw,curUser.account.email)){
				reply.code(201).send({
					code:'fail',
					msg:'密码错误'
				})
			}else{
				const updatedUser = await model_userInfo.findByIdAndUpdate(userId,{$set:{'account.psw':newPsw}})
				if(updatedUser.account){
					delete curUser.account.psw
					reply.code(200).send({
						code:'success',
						msg:'密码修改成功',			
					})
				}
			}
		}
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 修改用户信息
 * /account/private/rest/updateUserInfo
 * @param {*} req
 * @param {*} reply
 */
exports.post_private_updateUserInfo = async (req, reply) => {
	const userId = req.session ? req.session.userId : ''
	try {
		if(!req.userLogin||!userId){
			reply.code(201).send({
				code:'fail',
				msg:'用户未登录或登录失效'			
			})
		}else{
			const curUser = await model_userInfo.findByIdAndUpdate(userId,req.body,{new:true})
			console.log(curUser)
			if(curUser.account){
				delete curUser.account.psw
				reply.code(200).send({
					code:'success',
					msg:'用户个人信息修改成功',			
					data:curUser
				})
			}
		}
		reply.code(401).send({
			code:'fail',
			msg:'请求失败'			
		})
	} catch (error) {
		throw boom.boomify(error)
	}
}