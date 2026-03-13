const multer  = require('multer');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
  
  const uploadStorage = multer({ storage: storage })

  module.exports = uploadStorage;