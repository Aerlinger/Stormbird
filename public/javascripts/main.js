console.log("main.js included");

var server = io.connect(window.location.hostname);


server.on('connect', function(data) {
	console.log('Client connected!');

	server.on('octave_response', function(response) {
		console.log("Response: ");
		console.log(response);
	});

	$('a').click( function(event) {
		var command =	prompt('enter command');
		server.emit('command', command);
	});

});
