// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true,
})

// Require external modules
const mongoose = require('mongoose')

// Import Routes
const routes = require('./routes')


// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

fastify.use(require('cors')())
// Connect to DB
mongoose.connect('mongodb://localhost:27017/school_bbs',{ useNewUrlParser: true })
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

// mock user 信息

// require('./models/UserInfo').remove((err,product)=>{
//   if(err)throw err
//   console.log('delete userinfos success')
//   console.log(product)
// })
// require('./mock/UserInfo')()

// Loop over each route
routes.forEach((route, index) => {
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
