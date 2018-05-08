'use strict'

const Hapi = require('hapi')
const routes = require('./routers')

//import config file
const { PORT } = require('./config')

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: PORT
});

// Add the route
routes.forEach(route => {
  server.route(route)
})

// Start the server
const start = async () => {

  // register plugin DEV mode
  if (process.env.NODE_ENV !== 'production') {
    await server.register([
      require('blipp'),
      require('inert'),
      require('vision'),
      {
        plugin: require('hapi-swagger'), 
        options: {
          info: {
            title: 'API Server Documentation',
            version: require('./package.json').version,
            contact: {
              'name': 'Tuan Ngo',
              'email': 'nhutuan.ngo@gmail.com'
            }
        },
      }}
    ])
  } 

  // log plugin register 
  await server.register({ plugin: require('good'), 
    options: {
      ops: { interval: 1000 },
      reporters: {
        console: [
          { module: 'good-squeeze', name: 'Squeeze', args: [{ log: '*', response: '*' }]}, 
          { module: 'good-console', args: [{  format: 'HH:MM:SS-SSS', utc: false, color: true }]},
          'stdout'
        ]
      }
    }
  })

  // server status plugin
  await server.register([require('hapi-alive')])  
  
  try {
    await server.start()
  }
  catch (err) {
    console.log(err)
    process.exit(1)
  }

  server.log('starting', 'Server running at: ' + server.info.uri)
}

start()