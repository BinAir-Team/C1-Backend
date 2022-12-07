const multer = require("multer");
const fs = require("fs");
let path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileLocation = "./public/static/images";
    if (!fs.existsSync(fileLocation))
      fs.mkdirSync(fileLocation, { recursive: true });
    cb(null, fileLocation);
  },
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now() + `.${fileType}`);
  },
});
const imageUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".mp4")
      return cb(null, true);
    cb(null, false);
    cb(new Error("Wrong filetype"));
  },
  limits: {
    fileSize: 2000000,
  },
});

module.exports = imageUpload;
