/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 16:39:46 
 * @Last Modified by:   李国亮 
 * @Last Modified time: 2019-03-05 16:39:46 
 */
module.exports = {
	$id:'account',
	type:'object',
	properties: {
		id: { type: 'number' }, //账号id
		mobile: { type: 'string' }, //手机号码
		email: { type: 'string' }, //邮箱
		psw: { type: 'string' }, //密码，加密模式-...
		type: { type: 'string'} //admin || user
  }
}


