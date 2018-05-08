'use restrict'

const glob = require('glob')
const path = require('path')

let routes = []
glob.sync( './routers/!(index)*.js' ).forEach( file => {
  routes = routes.concat(require(path.resolve( file )))
})

module.exports = routes