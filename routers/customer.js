const Customer = require('../controllers/Customer')

module.exports = [
  {
    method: 'POST',
    path: '/customer',
    config: {
      tags: ['api'],
      description: 'add new customer',
    },
    handler: Customer.add
  }
]