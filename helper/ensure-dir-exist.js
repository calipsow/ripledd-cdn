const fs = require("fs");

function ensureDirExist(dirPath = __dirname) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
module.exports = ensureDirExist;
