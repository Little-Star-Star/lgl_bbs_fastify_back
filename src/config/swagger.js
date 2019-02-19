exports.options = {
  routePrefix: '/user',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'User API',
      description: 'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
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
    consumes: ['application/json'],
    produces: ['application/json']
  }
}
