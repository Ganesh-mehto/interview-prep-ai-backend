const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/") // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`) // Fixed typo
    }
})
const fileFilter = (req, file, cb) => {
    const allowedType = ['image/jpeg', 'image/png', "image/jpg"]
    if (allowedType.includes(file.mimetype)) { // Fixed typo
        cb(null, true)
    } else {
        cb(new Error('only .jpeg, .png, .jpg formats are allowed'), false)
    }
}
const upload = multer({ storage, fileFilter })

module.exports = upload