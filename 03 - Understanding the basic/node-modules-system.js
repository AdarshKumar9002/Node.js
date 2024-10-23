const http = require("http");
const routes = require("./route-node-module-system");



const server = http.createServer(routes);

server.listen(3000);
