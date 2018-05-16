const Boom = require('boom')
const ObjectID = require('mongodb').ObjectID

const Customer = require('../models/customer')

module.exports = {
  add: async (request, h) => {

    const data = request.payload
    request.log('api-add', data)
    
    try {

      await Customer.insertOne(data)

      return h.response().code(201)
    } catch (error) {
      request.log('api-get', error)
      throw Boom.badData('not allowed', error)
    }
  },

  get: async (request, h) => {

    request.log('api-get', 'request')
    const id = request.params.id
    
    if (ObjectID.isValid(id)) {

      request.log('api-get', id)
      
      try {

        return await Customer.findById(id)
      } catch (error) {

        request.log('api-get', error)
      }
    }
    
    throw Boom.notFound()
  },
  
  update: async (request, h) => {

  }
}