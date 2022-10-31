const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
	let body = "";
	req.on('data', function (chunk) {
		body += chunk;
	});
	req.on('end', function () {
		console.log('POSTed: ' + body);
	});
	
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	//res.setHeader('Access-Control-Allow-Headers', 'req.header.origin');
	res.setHeader('Access-Control-Allow-Headers', '*');
	//res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
	
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}
	
	if ("GET".indexOf(req.method) > -1) {
      res.writeHead(200);
      res.end("Hello World");
      return;
    }
	
	if ("POST".indexOf(req.method) > -1) {
      res.writeHead(200);
      res.end("success");
      return;
    }
	
	res.writeHead(200);
    res.end("My first server!");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});