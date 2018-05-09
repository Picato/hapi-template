'use strict'

const Hapi = require('hapi')
const routes = require('./routers')

// import config file
const { 
  PORT, 
  LOG_OPTIONS, 
  MONGOO_OPTS,
  CORS } = require('./config')

// create a server with a host and port
const server = Hapi.Server( {host: 'localhost', port: PORT, routes: { cors: CORS || false } })

// add all routes
routes.forEach(route => { server.route(route) })

// start the server
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
  await server.register({ plugin: require('good'), options: LOG_OPTIONS })

  // server status plugin
  await server.register([require('hapi-alive')])  
  
  console.error(MONGOO_OPTS)
  // mongo db
  if ( MONGOO_OPTS ) {
    await server.register({
      plugin: require('hapi-mongo-models'),
      options: {
        mongodb: MONGOO_OPTS,
        // models: require('./models'),
        models: [
          '/home/tuan/workspace/hapi/hapi-template/models/customer.js'
        ],
        autoIndex: false
      }
    })
  }
  
  try {

    await server.start()

  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  server.log('starting', 'Server running at: ' + server.info.uri)
}

start()