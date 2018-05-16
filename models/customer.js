'use strict'

const Joi = require('joi')
const MongoModels = require('mongo-models')

const schema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
})

class Customer extends MongoModels {}

Customer.collectionName = 'customers' // the mongodb collection name
Customer.schema = schema

module.exports = Customer