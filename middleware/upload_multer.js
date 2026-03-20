


const multer = require("multer")

const storage = (folder) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads/${folder}`)
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
});

const upload = (folder) => multer({storage: storage(folder)})

module.exports = upload