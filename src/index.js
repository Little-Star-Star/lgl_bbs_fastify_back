// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true,
})

const path = require('path')

fastify.register(require('fastify-multipart'))
require('./controllers/fileManage').post_upload_img(fastify)
require('./controllers/fileManage').post_upload_release_img(fastify)


const fastifySession = require('fastify-session');
const fastifyCookie = require('fastify-cookie');
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: 'https://liguo-liang@lightlovexujia.top:1314',
  cookie: {
    maxAge:1000*60*60*24,
  },
  cookieName:'userlogin'
});
// 添加一个userLogin
fastify.decorateRequest('userLogin', false)
// 对请求进行处理之前,先判断用户是否已经登录
fastify.addHook('preHandler', (request, reply, next) => {
  if(request.cookies.userlogin&&request.session.sessionId){
    request.sessionStore.get(request.session.sessionId,(a,session)=>{
      if(session){
        request.userLogin = session.encryptedSessionId === request.session.encryptedSessionId
      }else{
        request.userLogin = false
      }
    })
  }
  next()
})
// Require external modules
const mongoose = require('mongoose')

// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger&&添加通用schema到definitions中
const Res200_copy = Object.assign({}, require('./common/schema/res200'))
delete Res200_copy.description
swagger.options.swagger.definitions = {
  Account: require('./common/schema/account'),
  Res200: Res200_copy
}
// account tags
swagger.options.swagger.tags = [{
  name: 'account-view',
  description: '  账号系统相关VIEW'
}, {
  name: 'private-account-view',
  description: '  (需要授权)账号系统相关VIEW'
}, {
  name: 'account-rest',
  description: '  账号系统相关API'
}, {
  name: 'private-account-rest',
  description: '  (需要授权)账号系统相关API'
}]
swagger.options.routePrefix = 'account'
fastify.register(require('fastify-swagger'), swagger.options)

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../assets'),
  prefix: '/',
})
fastify.use(require('cors')()) //允许跨域



// Connect to DB-light:用户，只有操作school_bbs数据库的权限
mongoose.connect('mongodb://localhost:27017/school_bbs', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB connected...')
  })
  .catch(err => console.log(err))

// mock user 信息

// require('./mock/userInfo')()

// require('./mock/news')()

// require('./mock/secondHand')(133)


//添加通用schema
fastify.addSchema(require('./common/schema/account.js'))
fastify.addSchema(require('./common/schema/res200'))
fastify.addSchema(require('./common/schema/res200withdata'))
fastify.addSchema(require('./common/schema/res200withdataandpage'))

// 注册每个路由
const allRoutes = require('./routes')
// 账号路由
allRoutes.routes_account.forEach((route, index) => {
  fastify.route(route)
})
// 资讯路由
allRoutes.routes_news.forEach((route, index) => {
  fastify.route(route)
})
// 评论路由
allRoutes.routes_comment.forEach((route, index) => {
  fastify.route(route)
})
// 二手物品路由
allRoutes.routes_secondHand.forEach((route, index) => {
  fastify.route(route)
})

fastify.setNotFoundHandler({
  preValidation: (req, reply, next) => {
    // 你的代码
    next()
  } ,
  preHandler: (req, reply, next) => {
    // 你的代码
    next()
  }  
}, function (request, reply) {
    // 设置了 preValidation 与 preHandler 钩子的默认 not found 处理函数
    reply
			.code(200)
			.header('Content-Type', 'text/html;charset="utf-8"')
			.sendFile('index.html')
})


// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0")
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()