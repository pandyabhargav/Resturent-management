const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { authMiddleware } = require("../middleware/authMiddleware");
router.use(authMiddleware);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to save uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit: 10MB
});

const { ImgUpload } = require("../controllers/UploadController.js");

router.post("/img-upload", upload.single("image"), ImgUpload);

module.exports = router;
