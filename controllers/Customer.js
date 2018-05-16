const Boom = require('boom')
const Customer = require('../models/customer')

module.exports = {
  add: async (request, h) => {
    const data = request.payload
    request.log('api', data)
    try {

      await Customer.insertOne(data)
    } catch (error) {
      console.log(error)
    }

    return h.response().code(201)
  },

}