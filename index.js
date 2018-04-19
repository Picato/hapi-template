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
            version: '1.0',
            'contact': {
              'name': 'Tuan Ngo',
              'email': 'nhutuan.ngo@gmail.com'
            }
        },
      }}
    ])
  } 

  // register useful plugin 
  await server.register([require('hapi-alive')])  
  
  try {
    await server.start()
  }
  catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.uri)
}

start()