'use strict'

const Hapi = require('hapi')

const routes = require('./router')

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 8000
});

// Add the route
routes.forEach(route => {
  server.route(route)
})

// Start the server
const start = async () => {

  // register plugin DEV mode
  if (process.env.NODE_ENV !== 'production') {
    await server.register([require('blipp')])
  } 

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