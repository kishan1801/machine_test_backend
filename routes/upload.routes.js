const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { uploadAndDistribute } = require("../controllers/upload.controller");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadAndDistribute,
);

module.exports = router;
