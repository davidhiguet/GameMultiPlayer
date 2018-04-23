'use strict';
const io = require('socket.io')();
const mongoose = require('mongoose');
const Party = require('./bdd/Party');

var availableRooms = [];
var games = {};
var clients = {};
var winner = {};
var save = true;

 var newGame = (function() {
   var Game = function(id) {
     this.id = id;
     this.players = {};
     this.count = 0;
   };
   Game.prototype.addPlayer = function(socket) {
     this.players[socket.id] = {
        id: socket.id,
        name: socket.name,
        avatar: socket.avatar,
        score: 0
     };
     this.count += 1;
   };
   Game.prototype.removePlayer = function(id) {
     delete this.players[id];
     this.count -= 1;
   };
   return function(id) {
     return new Game(id);
   };
 }());

var uniqueId = function () {
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randomLetter + Date.now();
};

var play = function (socket, room) {
   console.log(socket.id)
     io.to(room).emit('letSGo', socket.id);
 };

var createRoom = function (){
   let room = uniqueId();
   availableRooms.push(room);
   games[room] = newGame(room);
   return room;
 };

var joinRoom = function (socket) {
   var room = availableRooms.shift() || createRoom();
   if (socket.rooms[room]) {
     return room;
   }
   socket.join(room);
   socket.emit('joinRoom', room);
   games[room].addPlayer(socket);
   if (games[room].count === 2) {
     io.to(room).emit('roomFull', games[room]);
     // setTimeout(function() {
     play(socket, room);
     // }, 10000);
   }
   return room;
 };

var cleanRoom = (room) => {
   if (games[room].count === 0) {
     let ind = availableRooms.indexOf(room);
     if (ind >= 0) {
       availableRooms.splice(ind, 1);
     }
     delete games[room];
   }
};
var result = function(data){
    var score = data;
    var room = data.room;

    if (score.scorePlayer === score.scorePlayer2) {
      winner.egal = score.scorePlayer2;
        
        io.to(room).emit('result', winner);
    }
    
    if (score.scorePlayer < score.scorePlayer2) {
        winner.name = score.namePlayer2;
        winner.score = score.scorePlayer2;

        io.to(room).emit('result', winner);
    } 
    
    if (score.scorePlayer > score.scorePlayer2) {
        winner.name = score.idPlayer;
        winner.score = score.scorePlayer;

        io.to(room).emit('result', winner);
    }
 }
 var register = function(data){

  console.log('fin')
  var party = new Party({
    name: data.name,
    score: data.score,
    }).save(function (err, party) {
    if (err) {
      console.log(err);
    } else {
        console.log('save best player');
        deleteSocket(data.room)
    };
  });
};


var deleteSocket = function (socket) {
   delete clients[socket];
 };

var connection = function (socket){

   socket.on('multiPlayerGame', function(data) {
      
     var room;
     var index;
     
        socket.emit('multiPlayerGame', socket.id);
        socket.name = data.user;
        socket.avatar = data.avatar;
        clients[socket.id] = socket;
        room = joinRoom(socket);
        index = global.players.push(socket.name) - 1;
     

     socket.on('score', function(data) {
       io.to(room).emit('evolutionScore', data);
     });

    socket.on('scoreFinal', function(data){
        result(data)
    });

     socket.on('finish', function (data) {
        if (save === true) {
          register(data)
          save = false;
          return save;
        };
     });
     
     socket.on('disconnect', function() {
        global.players.splice(index, 1);
        socket.to(room).emit('deconnection', socket.id);
        games[room].removePlayer(socket.id);
        cleanRoom(room);
        deleteSocket(socket.id);
      });
   });
 };
 
io.on('connection', function (socket) {
    console.log('connectionio')
    connection(socket);
});
module.exports = io;