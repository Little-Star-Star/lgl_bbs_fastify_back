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


