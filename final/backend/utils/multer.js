// backend/utils/multer.js
const multer = require("multer");

const storage = multer.memoryStorage(); // 👈 buffer me image store karna

const upload = multer({ storage });

module.exports = upload;

