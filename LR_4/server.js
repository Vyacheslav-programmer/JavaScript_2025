const http = require('http');

const HOST = 'localhost';
const PORT = 8000;

const handler = (req, res) => {
    res.writeHead(200);
    res.end('JS is a cool programming language');
}

const server = http.createServer(handler);
server.listen(PORT, HOST, () => {
    console.log(`A server is launched at URL-address http://${HOST}:${PORT}`);
})