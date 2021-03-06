// 控制器
const ctrl_userInfo = require('../../controllers/userInfo')
// swagger + fastify 使用是schema 文档
const doc_userInfo = require('../schema_doc/userInfo')

module.exports = [
	{
    method: 'GET',
    url: '/admin/getInfo',
    handler: ctrl_userInfo.adminGetAllUsersInfo,
    schema:doc_userInfo.schema_adminGetAllUsersInfo
  },
  {
    method: 'GET',
    url: '/admin/getInfo/:userid',
		handler: ctrl_userInfo.adminGetUserInfoById,
		schema:doc_userInfo.schema_adminGetUserInfoById
	},
	{
		method: 'GET',
		url:'/private/getInfo',
		handler:ctrl_userInfo.privateGetSelfInfo,
		schema:doc_userInfo.schema_privateGetSelfInfo
	}
	// 返回静态html文件
	
]