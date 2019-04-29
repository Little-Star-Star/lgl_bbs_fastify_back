const CryptoJS = require('crypto-js')
const SHA256 = require('crypto-js/sha256')
let id_add = 0
/**
 *  id 自增
 */

function idAdd(start = 0, step = 1) {
	if (arguments.length > 0) {
		id_add = start
	}
	id_add += (step || 1)
	return id_add
}
/**
 * 加密-密码请以AES128/CBC/PKCS5Padding模式加密,key=账号SHA256前32位,iv=账号SHA256后32位.
 * @param {*} password
 * @param {*} account
 * @returns
 */
function encode(password, account) {
	const key = SHA256(account).toString().slice(0, 32)
	const iv = SHA256(account).toString().slice(32, 64)
	return CryptoJS.AES.encrypt(password, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	}).toString()
}
/**
 * 解密-密码请以AES128/CBC/PKCS5Padding模式加密,key=账号SHA256前32位,iv=账号SHA256后32位.
 * @param {*} encrypted
 * @param {*} account
 * @returns
 */

function decode(encrypted, account) {
	const key = SHA256(account).toString().slice(0, 32)
	const iv = SHA256(account).toString().slice(32, 64)
	return CryptoJS.AES.decrypt(encrypted, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	}).toString(CryptoJS.enc.Utf8)
}
/**
 * 判断手机号码
 * @param {*} account
 * @returns
 */
function isPhone(account) {
	return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(account)
}
/**
 *判断是否是邮箱
 * @param {*} account
 * @returns
 */
function isMail(account) {
	return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(account)
}
/**
 *判断是否是合法用户
 * @param {*} account
 * @returns
 */
function isPhoneOrMail(account) {
	return isPhone(account) || isMail(account)
}
/**
 *
 *判断是否是6位数字验证码
 * @param {*} captcha
 * @returns
 */
function isCaptcha(captcha) {
	return /^[0-9]{6}$/.test(captcha)
}

/**
 *  生成6位数字验证码
 * @returns
 */
function sixNumber() {
	let six = (Math.random() * 10000000000).toFixed(0).slice(0, 6)
	return six.length === 6 ? six : sixNumber()
}

/**
 * 发送邮箱验证码
 *
 * @param {*} mail 验证码接收邮箱
 * @param {*} sixCode 六位验证码
 */
function generateCode(mail, sixCode) {
	const nodemailer = require('nodemailer');
	let transporter = nodemailer.createTransport({
		service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
		port: 465, // SMTP 端口
		secureConnection: true, // 使用了 SSL
		auth: {
			user: '3010972113@qq.com',
			pass: 'fhqvmgtkjowydgah',
		}
	});
	let mailOptions = {
		from: '"LIJ1314" <3010972113@qq.com>', // sender address
		to: mail, // list of receivers
		subject: 'BBS验证码', // Subject line
		html: `<div style="color:#333;font-weight:bold;font-size:24px;text-align:center;padding:100px 0;">${sixCode}
			<div style="color:#f44;font-size:14px;text-align:center;padding:30px 0;">验证码有效时长：15分钟</div>
		</div>` // html body
	};

	return transporter.sendMail(mailOptions, (error, info) => {
		if (error) return 'error'
		return info.messageId
	});
}
/**
 * 生成uuid "49e802d8-d74b-4cc1-ea38-2e19546c7929"
 * @returns
 */
function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	});
	return uuid;
};

module.exports = {
	idAdd,
	encode,
	decode,
	isPhone,
	isMail,
	isPhoneOrMail,
	isCaptcha,
	sixNumber,
	generateCode,
	generateUUID
}