var
  port = 8080,
  host = 'localhost',
  http = require('http'),
  server = http.createServer(handleHTTP),
  nodeStatic = require('node-static'),
  fileServer = new nodeStatic.Server();

server.listen(port, host, function() {
  console.log('server started and listening on ' + port + '...');
});

function handleHTTP(req, res) {
  req.on('data', function(chunk) {
    console.log('Received body data:');
    console.log(chunk.toString());
  });

  req.on('end', function () {
    console.log(req.method + ': ' + req.url);

    fileServer.serve(req, res, handleError);
  }).resume();

  function handleError(err) {
    if (err) { // There was an error serving the file
      console.error('Error serving ' + req.url + ' - ' + err.message);

      // Respond to the client
      res.writeHead(403);
      res.end();
    }
  }
}