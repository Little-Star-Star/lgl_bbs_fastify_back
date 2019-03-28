// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true,
})

// Require external modules
const mongoose = require('mongoose')
const path = require('path')


// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger&&添加通用schema到definitions中
const Res200_copy = Object.assign({},require('./common/schema/res200')) 
delete Res200_copy.description
swagger.options.swagger.definitions ={
  Account:require('./common/schema/account'),
  Res200:Res200_copy
}
// account tags
swagger.options.swagger.tags = [{
  name:'account-view',
  description:'  账号系统相关VIEW'
},{
  name:'private-account-view',
  description:'  (需要授权)账号系统相关VIEW'
},{
  name:'account-rest',
  description:'  账号系统相关API'
},{
  name:'private-account-rest',
  description:'  (需要授权)账号系统相关API'
}]
swagger.options.routePrefix = 'account'
fastify.register(require('fastify-swagger'), swagger.options)

fastify.register(require('fastify-static'), {
  root: path.join(__dirname,'../assets'),
})
fastify.use(require('cors')()) //允许跨域



// Connect to DB-light:用户，只有操作school_bbs数据库的权限
mongoose.connect('mongodb://localhost:27017/school_bbs',{ useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected...')
  })
  .catch(err => console.log(err))


// mock user 信息

require('./models/userInfo').remove((err,product)=>{
  if(err)throw err
  console.log('delete userinfos success')
  console.log(product)
})
require('./mock/userInfo')()



//添加通用schema
fastify.addSchema(require('./common/schema/account.js'))
fastify.addSchema(require('./common/schema/res200'))

// 注册每个路由
const allRoutes = require('./routes')
allRoutes.routes_account.forEach((route, index) => {
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

