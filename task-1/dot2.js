const csvtojson = require("csvtojson");
const { createReadStream, createWriteStream, writeFile } = require('fs');

const csvFilePath = './examples/nodejs-hw1-ex1.csv';
const txtFilePath = './examples/nodejs-hw1-ex1';

const pipelineMethod = () => {
  const readStream = createReadStream(csvFilePath);
  const writeStream = createWriteStream(`${txtFilePath}-pipeline.txt`);
  
  writeStream.on('error', console.log)
  readStream.on('error', console.log)
  
  readStream.pipe(
    csvtojson({ignoreColumns: /(amount)/ })
      .preFileLine((fileLineString, lineIdx) => {
        if (lineIdx === 0) {
          fileLineString = fileLineString.toLowerCase();
        }
        return fileLineString
      })
    )
  .pipe(writeStream);
}

const conventionalMethod = () => {
  let result = '';
  csvtojson()
    .fromFile(csvFilePath)
    .subscribe((json, _) => {
      delete json.Amount;
      result += `${JSON.stringify(json)}\n`
    }, console.log, () => {
      writeFile(`${txtFilePath}-conventional.txt`, result, console.log)
    })
}

pipelineMethod();
conventionalMethod();
