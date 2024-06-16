const fs = require("fs");
const path = require("path");

function getFilesInDir(dir = __dirname) {
  try {
    let files = fs.readdirSync(dir, {}).map((f) => {
      return path.join(dir, f);
    });
    return files;
  } catch (error) {
    console.error("An error has occurred:", error);
    return [];
  }
}

module.exports = getFilesInDir;
