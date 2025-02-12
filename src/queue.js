const { Queue, Worker } = require("bullmq");
const imageProcessor = require("./image-processor");

const imageQueue = new Queue("imageQueue");

const addJobToQueue = async (filePath) => {
  await imageQueue.add("processImage", { filePath });
};

// Worker Thread to process jobs
new Worker("imageQueue", async (job) => {
  console.log(`Processing ${job.data.filePath}`);
  await imageProcessor.process(job.data.filePath);
  console.log("Processing complete");
});

module.exports = { addJobToQueue };
