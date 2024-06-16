const router = require("express").Router();
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");
const ensureDirExist = require("../../helper/ensure-dir-exist");
const getFilesInDir = require("../../helper/resolve-dir-files");
const { deleteFiles } = require("../../utils/delete-files");
const UPLOAD_DIR = path.join(path.resolve("uploads"), "temp");
const FINAL_DIR = path.join(path.resolve("public"), "img");
ensureDirExist(FINAL_DIR);
ensureDirExist(UPLOAD_DIR);

// Konfigurieren Sie Multer, um Bilder temporär zu speichern
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, randomUUID() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Middleware zum Komprimieren und endgültigen Speichern des Bildes
const compressAndSave = async (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return next(new Error("No files uploaded"));
  }

  try {
    for (const file of files) {
      const tempPath = file.path;
      const targetPath = path.join(FINAL_DIR, file.filename);

      await sharp(tempPath)
        .resize(800)
        .toFormat("jpeg", { quality: 80 })
        .toFile(targetPath.replace(targetPath.split(".").at(-1), "jpeg"));
      console.log("File saved:", targetPath);
    }
    next();
  } catch (err) {
    next(err);
  }
};

// Route zum Hochladen von Bildern
router.post(
  "/upload",
  upload.array("images", 5),
  compressAndSave,
  async (req, res, next) => {
    await deleteFiles(getFilesInDir(UPLOAD_DIR));
    res.send("Files uploaded and processed");
  }
);

module.exports = router;
