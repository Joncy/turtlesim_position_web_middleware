// Requires
var express = require('express');
var socketio = require('socket.io');
var exec = require('child_process').exec;

// Configuration
var appConfig = {
	staticPath: __dirname + '/public'
}

// Application
var app = express();
var server = require('http').createServer(app);
var io =  socketio.listen(server);

var scaleX = 2.38095238,
	scaleY = 2.85714286,
	offset = 0.5;

// Middlewares
app.use(express.static(appConfig.staticPath));

// Socket
io.sockets.on('connection', function(socket) {
	socket.emit('data', 'Ready to go!');
	console.log("A user connected");
	socket.on('move', function(data) {
		console.log("X point: " + data.x + ", Y point: " + data.y);
			if (data.x <= 4.3 && data.y <= 3.5) {
				var xPoint = data.x * scaleX + offset;
				var yPoint = data.y * scaleY + offset;

				exec("rostopic pub \/turtle1\/PositionCommand geometry_msgs\/Pose2D \"x: " 
					+ xPoint + "\ny: " + yPoint +"\ntheta: 0.0\" \-1",  
					function (error, stdout, stderr) {
		    			console.log('stdout: ' + stdout);
		   				console.log('stderr: ' + stderr);
		    			if (error !== null) {
		      				console.log('exec error: ' + error);
		    			}
		    		}
		    	);
    		}
	});
});

// Server
var argv = require('minimist')(process.argv.slice(2));
port = argv.port || 31416;

if(isNaN(port)) {
	console.log("Port \"%s\" is not a number.", port);
	process.kill(1);
}

app.use(express.static(__dirname));

server.listen(port, function () {
  console.log('Example app listening at http://%s:%s', 
  	server.address().address,
  	server.address().port);
});