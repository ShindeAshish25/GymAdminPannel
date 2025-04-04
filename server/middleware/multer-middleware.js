const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileName = uniqueSuffix + '-' + file.originalname.replaceAll(' ', '_');
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

module.exports = upload;