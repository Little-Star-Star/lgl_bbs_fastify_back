exports.addCarSchema = {
  description: 'Create a new car',
  tags: ['cars'],
  summary: 'Creates new car with given values',
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      brand: { type: 'string' },
      price: { type: 'string' },
      age: { type: 'number' },
      services: { type: 'object' }
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        brand: { type: 'string' },
        price: { type: 'string' },
        age: { type: 'number' },
        services: { type: 'object' },
        __v: { type: 'number' }
      }
    }
  }
}

exports.getCarSchema = {
  description:'get all cars',
  tags:['cars','else'],
  summary:'get all cars —— title',
  response:{
    200:{
      description:'get all cars successfully',
      type:'object',
      properties:{
        _id:{type:'string'}
      }
    }
  }
}
