const express = require("express");
const multer = require("multer");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

const upload = multer({ dest: "uploads/" });
router.post("/image", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  res.json({
    message: "Image uploaded successfully",
    filename: req.file.filename,
  });
});

module.exports = router;
