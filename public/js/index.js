// creates our connection
var socket = io();

// use functions instead of arrow functions on client side
// client listening for connect to server
socket.on('connect', function() {
  console.log('We connected!');

  socket.emit('createMessage', {
    from: 'timmycron',
    text: 'WOOOOOAH'
  });
});

// client listening for disconnect from server
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// custom event
socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
