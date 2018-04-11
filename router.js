'use strict'

const { Test } = require('./controllers')

module.exports = [
  {
    method: 'GET',
    path: '/test',
    config: {
      tags: ['api'],
      description: 'For testing',
    },
    handler: Test.test
  }
]