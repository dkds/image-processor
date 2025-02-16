const express = require("express");
const multer = require("multer");
const { addJobToQueue } = require("./queue");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

const upload = multer({ dest: "uploads/" });
router.post("/image", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  // Add image processing job to BullMQ queue
  await addJobToQueue(req.file.path);

  res.json({
    message: "Image is being processed",
    filename: req.file.filename,
  });
});

module.exports = router;
