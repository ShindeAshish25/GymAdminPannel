const fs = require('fs')
const path = require('path')
const multer = require('multer')

const checkAndCreateFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        checkAndCreateFolder('uploads');
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