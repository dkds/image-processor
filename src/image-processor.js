const sharp = require("sharp");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

if (!isMainThread) {
  console.log("Processing image in worker thread");
  sharp(workerData.filePath)
    .resize(300)
    .toFormat("webp")
    .toFile(`${workerData.filePath}-processed.webp`, (err, info) => {
      if (err) {
        console.error("Error processing image:", err);
        parentPort.postMessage({ error: err.message });
      } else {
        console.log("Image processed successfully:", info);
        parentPort.postMessage({ success: info });
      }
    });
}

const processImage = async (filePath) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, { workerData: { filePath } });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

module.exports = { process: processImage };
