// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true,
})

// Require external modules
const mongoose = require('mongoose')
const path = require('path')


// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger
swagger.options.routePrefix = 'account'
fastify.register(require('fastify-swagger'), swagger.options)

fastify.register(require('fastify-static'), {
  root: path.join(__dirname,'../assets'),
})
fastify.use(require('cors')()) //允许跨域



// Connect to DB-light:用户，只有操作school_bbs数据库的权限
mongoose.connect('mongodb://light:834159672@localhost:27017/school_bbs',{ useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected...')
  })
  .catch(err => console.log(err))


// 使用model并保存到数据库
// let TestModel = mongoose.model('TestModel',new mongoose.Schema({test:'string'}),'helele')
// let testmodel = new TestModel({test:'hello model'})
// testmodel.save((err)=>{
//   if(err)throw err
//   console.log('save success')
// })

// // mock user 信息

// require('./models/userInfo').remove((err,product)=>{
//   if(err)throw err
//   console.log('delete userinfos success')
//   console.log(product)
// })
// require('./mock/userInfo')()



//添加通用schema
fastify.addSchema(require('./common/schema/account.js'))
fastify.addSchema(require('./common/schema/res200'))

// 注册每个路由
const allRoutes = require('./routes')
allRoutes.routes_account.forEach((route, index) => {
  fastify.route(route)
})
allRoutes.routes_userInfo.forEach((route, index) => {
  fastify.route(route)
})
// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

