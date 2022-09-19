const path = require('path');
const fs = require('fs');

const deleteFile = (fileDirectoryPath) => {
  var filePath = path.resolve(fileDirectoryPath);
  fs.unlink(filePath, function(err) {
    if (err) {
      console.log(err);
    }
  });
};
 
module.exports = deleteFile;
