exports.PORT = 3000

exports.LOG_OPTIONS = {
  ops: { interval: 1000 },
  reporters: {
    console: [
      { module: 'good-squeeze', name: 'Squeeze', args: [{ log: '*', response: '*' }]}, 
      { module: 'good-console', args: [{  format: 'HH:MM:SS-SSS', utc: false, color: true }]},
      'stdout'
    ]
  }
}