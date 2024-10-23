const http = require('http');

function rqListener(req, res) {
    console.log("URL:",req.url);
    console.log("\nMethod: ",req.method);
    console.log("\nHeaders: ",req.headers);
}

const server = http.createServer(rqListener);

server.listen(3000);