#!/usr/bin/env node
require('babel/register')({
  // switch language to Ecmascript 6
  ignore: false
})
require('./server.js') // actual entrypoint
