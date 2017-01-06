// creates our connection
var socket = io();

// use functions instead of arrow functions on client side
// client listening for connect to server
socket.on('connect', function() {
  console.log('We connected!');
});

// client listening for disconnect from server
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// custom event
socket.on('newMessage', function(message) {
  console.log('newMessage', message);

  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {

  });
});
