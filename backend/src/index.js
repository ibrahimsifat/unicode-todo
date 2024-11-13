const server = require("./app/app"); // Import the modified app
const config = require("./config");
require("./config/db");
const PORT = config.port || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
