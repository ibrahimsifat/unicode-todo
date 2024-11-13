const http = require("http");
const app = require("./app/app");
const config = require("./config");
require("./config/db");
const server = http.createServer(app);
const PORT = config.port;

// listen the app
server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on PORT %s.", PORT);
});
