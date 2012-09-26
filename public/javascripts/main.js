console.log("main.js included");

var server = io.connect(window.location.hostname);

server.on('status', function(status) {
	console.log('status: ' + status['status']);
});	

server.on('messages', function(data) {
	alert(data.hello);
});

server.on('connect', function(data) {
	console.log('Client connected!');

	var command =	prompt('enter command');
	server.emit('command', command);	
});
