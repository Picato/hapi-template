'use strict'

const Boom = require('boom')

module.exports = {
  test: (request, h) => {
    throw Boom.internal('Internal Mysql Error')
  },
  
  post: (request, h) => {
    const data = request.params.id
    return "post success " + data
  }
}