'use restrict'

const glob = require('glob')
const path = require('path')

let models = []
glob.sync( './models/!(index)*.js' ).forEach( file => {
  models.push(file)
})

module.exports = models