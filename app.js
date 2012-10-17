/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
	, spawn = require('child_process').spawn
	, fs = require('fs');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

server.listen( app.get('port') || 3000, function(event) {
	console.log("app started");
});

io.sockets.on('connection', function(client) {

	console.log("Client connected!");

	var octave = spawn('octave');

	client.on('command', function(command) {
		console.log("Command received from client: " + command);

		octave.stdin.write(command);
		octave.stdin.end();

		octave.stdout.on('data', function(data) {
			console.log(data.toString());
			client.emit('octave_response', data.toString());
		});

	});

});
