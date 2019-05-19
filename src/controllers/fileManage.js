/*
 * @Author: 李国亮 
 * @Date: 2019-04-27 16:19:08 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-20 01:34:56
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
	fastify.post('/private/upload/img/:type', function (req, reply) {
		// 先判断是否是用户登录???
		// let avatarUrl = generateUUID()
		let {type} = req.params
		if (!req.userLogin) {
			reply.code(201).send({
				code: 'fail',
				msg: '用户未登录或登录失效'
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
				code: 'success',
				msg: '头像上传成功',
				// avatar:'avatar/' + avatarUrl
			})
		})

		mp.on('field', function (key, value) {
			console.log('form-data', key, value)
		})

		function handler(field, file, filename, encoding, mimetype) {
			console.log(field, filename, encoding, mimetype);
			pump(file, fs.createWriteStream(path.resolve(__dirname, '../../', 'assets/img/'+type) + '/' + filename))
		}
	})
}

/**
 * 其他所有图片的构建地址 暂时直接使用服务器存储图片
 */
exports.post_upload_release_img = (fastify) => {
	fastify.post('/private/upload/release', function (req, reply) {
		const userId = req.session ? req.session.userId : ''
		// 先判断是否是用户登录???
		if (!req.userLogin || !userId) {
            reply.code(201).send({
                code: 'fail',
                msg: '您还未登录,请登录!',
            })
        } else {
			// 构建图片路径通过用户id和时间来构建
			let lgl_filename = generateUUID()
			let ext = ''
			const mp = req.multipart(handler, function (err) {
				if (err) {
					reply.send(err)
					return
				}
				console.log('upload completed', process.memoryUsage().rss)
				reply.code(200).send({
					code: 'success',
					msg: '图片上传成功',
					// :'avatar/' + avatarUrl
					data: ['/img/release/'+lgl_filename + '.' + ext],
					errno: 0
				})
			})
	
			mp.on('field', function (key, value) {
				console.log('form-data', key, value)
				lgl_filename = value
			})
	
			function handler(field, file, filename, encoding, mimetype) {
				console.log(field, filename, encoding, mimetype);
				ext = filename.split('.')[filename.split('.').length - 1]
				pump(file, fs.createWriteStream(path.resolve(__dirname, '../../', 'assets/img/release') + '/' + lgl_filename + '.' + ext))
			}
		}
	})
}