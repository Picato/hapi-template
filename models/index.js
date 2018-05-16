'use restrict'

const glob = require('glob')

module.exports = glob.sync( './models/!(index)*.js',  { absolute: true } )