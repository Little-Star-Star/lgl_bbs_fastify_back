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
module.exports = {
	idAdd,
	encode,
	decode,
	isPhone,
	isMail,
	isPhoneOrMail,
	isCaptcha
}