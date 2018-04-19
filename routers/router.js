'use strict'

const Joi = require('joi')
const { Test } = require('../controllers')

module.exports = [
  {
    method: 'GET',
    path: '/test',
    config: {
      tags: ['api'],
      description: 'For testing',
    },
    handler: Test.test
  },
  {
    method: 'GET',
    path: '/post/{id}',
    config: {
      tags: ['api'],
      validate: {
        params: {
            id : Joi.number()
                    .required()
                    .description('the id for the todo item'),
        }
      },
      description: 'Test post',
    },
    handler: Test.post
  }
]