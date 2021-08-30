var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* 2 connected to a room*/
// var roomno = 1;
// io.on('connection', function (socket) {
//     //Increase roomno 2 clients are present in a room.
    
//     if (io.nsps['/'].adapter.rooms["room-" + roomno] && io.nsps['/'].adapter.rooms["room-" + roomno].length > 100)
//         roomno++;
//     socket.join("room-" + roomno);
    
//     //Send this event to everyone in the room.
//     io.sockets.in("room-" + roomno).emit('startmessage', "Connected to ToyCtrl Room#: " + roomno);
    
//     socket.on('message1', function (txt) {
//         io.sockets.in("room-"+ roomno).emit('message1', txt);
//         //io.sockets.in("room-" + roomno).emit('message1', txt);
//     });
    

//    socket.join("edibleplastyc-toyctrl");
//    io.sockets.in("edibleplastyc-toyctrl").emit('startmessage', "Welcome, you are now connecting to the plastyctoy ");
//    socket.on('message1', function (txt) {
//        io.sockets.in("edibleplastyc-toyctrl").emit('message1', txt);
//    });

    
//});

/* Namespace */
//var nsp = io.of('/ctrl');
//nsp.on('connection', function (socket) {
//        
//    nsp.emit('message', 'Toy Connected');
//
//    socket.on('message', function(txt){
//        nsp.emit('message', txt, socket.id);
//    });
//    
//});


///* default */
io.on('connection', function(socket){
   
   io.emit( 'greetings', 'Hello from the server: ' + socket.id , socket.id );
   
   io.emit('message',  'User: ' + socket.id + ' Connected');
   
   // listen for the 'message' event
   socket.on('message', function(txt){
       io.emit('message', txt, socket.id);
   });
   
   socket.on('disconnect', function() {
     console.log('Got disconnect!');
       io.emit('message',  'User: ' + socket.id + ' Disconnected');
  });
   
   socket.on('message1', function(txt){
       io.emit('message1', txt, socket.id);
   });

});

http.listen(port, function () {
    console.log('listening on *:' + port);
});

/* --------------------------------  simple chat example above -----------*/
