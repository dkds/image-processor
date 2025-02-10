const cluster = require("cluster");
const os = require("os");
const app = require("./src/server");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
