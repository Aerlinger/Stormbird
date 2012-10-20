console.log("Creating socket on client.");

var server = io.connect(window.location.hostname);

server.on('connect', function(data) {
	console.log('Client connected to server!');

  $('#submit').click( function(event) {
    var command =	$("#command").val();
    var args =	$("#args").val();
    console.log("Sent command: " + command + " with args " + args);
    server.emit('command', command);
  });

	server.on('octave_response', function(response) {
		console.log("Response: ");
		console.log(response);
	});

});
