const { createInterface } = require('readline');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', line => {
  const reversed = line.split('').reverse().join('')
  console.log(reversed)
});
