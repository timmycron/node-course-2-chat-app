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

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  // using functions like text and attr
  // rather than just injecting with template string... if you did that people
  // could inject malicious code
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
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

var locationButton = $('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});
