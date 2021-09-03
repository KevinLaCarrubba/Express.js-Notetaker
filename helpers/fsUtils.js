//bring in npm requirements
const fs = require("fs");
const util = require("util");

//promisify fs.readfile
const readFromFile = util.promisify(fs.readFile);

//set writeToFile function (destination, content)
const writeToFile = (destination, content) =>
//JSON.stringify content, 3 lines
  fs.writeFile(destination, JSON.stringify(content, null, 3), (err) =>
    err
      ? console.error(err)
      : console.info(`\nData was written to ${destination}`)
  );
//set readAndAppend function (conent, file location)
const readAndAppend = (content, file) => {
  //read files(name, type, err, data)
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      //parse incoming data
      const parsedData = JSON.parse(data);
      //push parsed data to append
      parsedData.push(content);
      //write file (file, parsed data)
      writeToFile(file, parsedData);
    }
  });
};
//export readFromFile, readAndAppend, writeToFile
module.exports = { readFromFile, readAndAppend, writeToFile };
