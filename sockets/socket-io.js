var spawn = require('child_process').spawn;

module.exports = function(app) {

  var io = require('socket.io').listen(app);

  io.sockets.on('disconnect', function (client) {
    console.log("Client disconnect!");
  });

  io.sockets.on('connection', function (client) {

    console.log("Received connection from client!");

    var octave = spawn('curl', ['-v']);

    octave.stdout.on('data', function (data) {
      console.log(data.toString());
      client.emit('octave_response', data.toString());
    });

    octave.stdout.on('end', function(data) {
      console.log('ended ' + data);
    });

    octave.on('exit', function(data) {
      console.log('exited ' + data);
    });

    client.on('command', function (command) {
      console.log("Command received from client: " + command);

      octave.stdin.write(command);
      octave.stdin.end();
    });

  });

}
