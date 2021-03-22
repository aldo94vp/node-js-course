"use strict";

var csvtojson = require("csvtojson");

var {
  createReadStream,
  createWriteStream
} = require('fs');

var csvFilePath = './examples/nodejs-hw1-ex1.csv';
var txtFilePath = './examples/nodejs-hw1-ex1.txt';
var readStream = createReadStream(csvFilePath);
var writeStream = createWriteStream(txtFilePath);
writeStream.on('error', console.log);
readStream.on('error', console.log);
readStream.pipe(csvtojson({
  ignoreColumns: /(amount)/
}).preFileLine((fileLineString, lineIdx) => {
  if (lineIdx === 0) {
    fileLineString = fileLineString.toLowerCase();
  }

  return fileLineString;
})).pipe(writeStream);