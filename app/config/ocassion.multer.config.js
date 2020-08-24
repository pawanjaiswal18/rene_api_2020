const multer = require('multer');
const photoPath = require('os').homedir + "/Rene/ocassion_upload/";
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
// var uploadOcassion = multer({ ocassionImage:ocassionImage})
module.exports = upload;