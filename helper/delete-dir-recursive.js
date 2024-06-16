const fs = require("fs");
const path = require("path");

function delDirRec(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, _) => {
      const currentPath = path.join(directoryPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        // Rekursion, wenn es ein Verzeichnis ist
        delDirRec(currentPath);
      } else {
        // Lösche die Datei
        fs.unlinkSync(currentPath);
      }
    });
    // Lösche das Verzeichnis
    fs.rmdirSync(directoryPath);
  }
}

module.exports = delDirRec;
