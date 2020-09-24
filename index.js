var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

server.listen(PORT, function() {
  console.log('Chat server running');
});

var io = require('socket.io')(server);

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined',name =>{
        console.log("new user",name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:  message,name: users[socket.id]});
    });
    socket.on('disconnect',() =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

});