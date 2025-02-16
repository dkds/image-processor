const { Queue, Worker } = require("bullmq");
const imageProcessor = require("./image-processor");
const config = require("./config");

const connection = {
  host: config.redis.host,
  port: config.redis.port,
};

const imageQueue = new Queue("imageQueue", { connection });

const addJobToQueue = async (filePath) => {
  console.log(`Adding job for file: ${filePath}`);
  await imageQueue.add("processImage", { filePath });
};

// Worker Thread to process jobs
new Worker(
  "imageQueue",
  async (job) => {
    console.log(`Processing ${job.data.filePath}`);
    await imageProcessor.process(job.data.filePath);
    console.log("Processing complete");
  },
  { connection }
);

module.exports = { addJobToQueue };
