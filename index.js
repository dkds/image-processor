const cluster = require("cluster");
const os = require("os");
const app = require("./src/server");
const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master process ${process.pid} is running`);
  console.log(`Number of CPUs: ${numCPUs}`);
  console.log("Starting workers...");

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}
