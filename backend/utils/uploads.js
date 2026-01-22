const multer = require('multer')

const Storage = multer.diskStorage({
  destination : "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: Storage,limits:{fileSize:5000000}})

module.exports = upload;