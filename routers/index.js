'use restrict'

const glob = require('glob')
const path = require('path')

let routes = []
glob.sync( './routers/*.js' ).forEach( file => {
  routes.concat(require(path.resolve( file )))
})

module.exports = routes