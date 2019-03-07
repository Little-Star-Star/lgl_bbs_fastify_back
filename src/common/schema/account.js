/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 16:39:46 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-03-06 13:16:22
 */
module.exports = {
	$id:'account',
	type:'object',
	properties: {
		id: { type: 'number',description:'账号id'}, //账号id
		mobile: { type: 'string' ,description:'手机号码'}, //手机号码
		email: { type: 'string' ,description:'邮箱'}, //邮箱
		psw: { type: 'string' ,description:'密码'}, //密码，加密模式-...
		type: { type: 'string',description:'用户类型'} //admin || user
  }
}



