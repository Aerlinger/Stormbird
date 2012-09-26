http = require 'http'
url = require 'url'
querystring = require 'querystring'
util = require 'util'

server = http.createServer (req, res) ->
	console.log "Listening on #{req.url}"

	res.writeHead(200, {"Content-Type": "text/html"})

	command = 
		func: "magic"
		args: "5"



	encoded_command = querystring.stringify(command)
	console.log("#{encoded_command}\n\n")

	recovered_command = querystring.parse(encoded_command)
	console.log("#{	util.inspect(recovered_command) }\n\n")
	
	res.write("Server responded\n")
	res.end()


server.listen 1337
