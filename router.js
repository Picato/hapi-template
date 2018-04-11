'use strict'

const { pong, Test } = require('./controllers')

module.exports = [
  {
    method: 'GET',
    path: '/ping',
    handler: pong
  },
  {
    method: 'GET',
    path: '/test',
    handler: Test.test
  }
]