var http = require('http');
var url = require('url');
var querystring = require('querystring');
var util = require('util');

server = http.createServer(function (req, res) {

  console.log("Listening on " + req.url);

  res.writeHead(200, {
    "Content-Type":"text/html"
  });

  var command = {
    func:"magic",
    args:"5"
  };
  var encoded_command = querystring.stringify(command);
  console.log("" + encoded_command + "\n\n");

  var recovered_command = querystring.parse(encoded_command);
  console.log("" + (util.inspect(recovered_command)) + "\n\n");

  res.write("Server responded\n");
  return res.end();
});

server.listen(1337);