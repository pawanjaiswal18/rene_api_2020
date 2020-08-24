const multer = require('multer');
const photoPath = require('os').homedir + "/Rene/upload/";
console.log(photoPath)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,photoPath)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+"-"+file.originalname)
    }
  })

var upload = multer({ storage: storage });
// var uploadCategory = multer({ categoryImage:categoryImage})
module.exports = upload;