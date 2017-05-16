var express = require('express');
var Cylon = require('cylon');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/*var messages = [ {
  id: 1,
  text: "Hola soy un mensaje",
  author: "Alexis Celestino"
}];*/

app.use(express.static('public'));

/*app.get('/hello', function(req, res) {
  res.status(200).send("Hola mundo");
});*/

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  Cylon.robot({
    connections: {
      arduino: { adaptor: 'firmata', port: '/dev/ttyUSB0' }
    },
    devices: {
     button: { driver: 'analog-sensor', pin: 2, lowerLimit: 0, upperLimit: 1023}
    },
    work: function(my) {
      every((0.5).second(), function(){
        var push = 0;
        push = my.button.analogRead();
        console.log('push: ', push);
        socket.emit('push', push);
      });
    }
  }).start()
    /*socket.on('new-message', function(data) {
      messages.push(data);

      io.sockets.emit('push',push);
    });*/
});

server.listen(8080, function() {
  console.log('Servidor corriendo en http://localhost:8080');
});
