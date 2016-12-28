const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// listens for new user connection and runs function when that happens
io.on('connection', (socket) => {
  console.log('New user connected');

  // emitting custom event
  socket.emit('newMessage', {
    from: 'timmycron',
    text: 'Hola TOM',
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    // io.emit goes to every connection, socket goes to just one
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
