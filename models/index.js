'use restrict'

const glob = require('glob')
const path = require('path')

module.exports = glob.sync( './models/!(index)*.js',  {absolute: true} )