// Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 2).
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {// We define a route handler / that gets called when we hit our website home
    // res.send('<h1>hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});
//Notice that I initialize a new instance of socket.io by passing the http (the HTTP server) object.
// Then I listen on the connection event for incoming sockets, and I log it to the console.
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);// send the message to everyone, including the sender
        console.log('message: ' + msg);
    });
});
http.listen(3000, function () {//We make the http server listen on port 3000
    console.log('listening on *:3000');
});
