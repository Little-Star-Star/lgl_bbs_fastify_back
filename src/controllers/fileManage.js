/*
 * @Author: 李国亮 
 * @Date: 2019-04-27 16:19:08 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-04-28 12:46:53
 */
// 文件上传下载
const fs = require('fs')
const path = require('path')
const pump = require('pump')
const generateUUID = require('../common/tool').generateUUID

/**
 * 处理上传图片的接口 用户头像保存,以及其他所有图片的构建地址 暂时直接使用服务器存储图片
 */
exports.post_upload_img = (fastify) => {
	fastify.post('/private/upload/avatar', function (req, reply) {
		// 先判断是否是用户登录???
		// let avatarUrl = generateUUID()
		if(!req.userLogin){
			reply.code(201).send({
				code:'fail',
				msg:'用户未登录或登录失效'			
			})
		}
		// 构建图片路径通过用户id和时间来构建
		const mp = req.multipart(handler, function (err) {
			if (err) {
				reply.send(err)
				return
			}
			console.log('upload completed', process.memoryUsage().rss)
			reply.code(200).send({
				code:'success',
				msg:'头像上传成功',
				// avatar:'avatar/' + avatarUrl
			})
		})

		mp.on('field', function (key, value) {
			console.log('form-data', key, value)
		})
		function handler(field, file, filename, encoding, mimetype) {
			console.log(field, filename, encoding, mimetype);
			pump(file, fs.createWriteStream(path.resolve(__dirname,'../../','assets/img/avatar') +'/' + filename))
		}
	})
}