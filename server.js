const http = require("http");
const port = process.env.PORT || 3000;
const app = require("./app.js");
const server = http.createServer(app, () => {
  console.log("Server is running on port " + port);
});

server.listen(port);
