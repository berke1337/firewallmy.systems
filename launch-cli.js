#!/usr/bin/env node
require('babel/register')({
  // switch language to Ecmascript 6
  ignore: false
})
require('./cli.js') // actual entrypoint
