exports.options = {
  routePrefix: '/account',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'User API',
      description: '校园论坛接口文档',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    // contact:{
    //   name:'light',
    //   url:'https://github.com/Little-Star-Star',
    //   email:'2319513900@qq.com'
    // },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json;charset=utf-8'],
    produces: ['application/json;charset=utf-8']
  }
}
