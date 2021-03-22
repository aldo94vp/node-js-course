"use strict";

require("core-js/modules/es.array.reverse.js");

require("core-js/modules/es.string.split.js");

var {
  createInterface
} = require('readline');

var rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
rl.on('line', line => {
  var reversed = line.split('').reverse().join('');
  console.log(reversed);
});