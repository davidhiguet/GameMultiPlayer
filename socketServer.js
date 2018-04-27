'use strict';
const io = require('socket.io')();
const mongoose = require('mongoose');
const Party = require('./bdd/Party');

var availableRooms = [];
var partyStarted = {};
var clients = {};
var winner = {};
var save = true;

var newParty = (function () {
  var PartyStart = function (id) {
    this.id = id;
    this.players = {};
    this.number = 0;
  };
  PartyStart.prototype.addPlayer = function (socket) {
    this.players[socket.id] = {
      id: socket.id,
      name: socket.name,
      avatar: socket.avatar,
      score: 0
    };
    this.number += 1;
  };
  PartyStart.prototype.removePlayer = function (id) {
    delete this.players[id];
    this.number -= 1;
  };
  return function (id) {
    return new PartyStart(id);
  };
}());

var stagingPoint = {

  uniqueId: function () {
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randomLetter + Date.now();
  },


  createRoom: function () {
    //console.log('roomCreate');
    var room = this.uniqueId();
    availableRooms.push(room);
    partyStarted[room] = newParty(room);
    return room;
  },

  joinRoom: function (socket) {
    var that= this;
    var room = availableRooms.shift() || this.createRoom();
    if (socket.rooms[room]) {
      return room;
    }
    socket.join(room);
    socket.emit('joinRoom', room);
    partyStarted[room].addPlayer(socket);
    if (partyStarted[room].number === 2) {
      io.to(room).emit('roomFull',partyStarted[room]);
      //console.log('roomFull');
      that.play(socket, room);
      
    }
    return room;
  },

  play: function (socket, room) {
    console.log(socket.id)
    io.to(room).emit('letSGo', socket.id);
  },

  result: function (data) {
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
  },
  register: function (data) {
    console.log('fin')
    if(save){
      var party = new Party({
        name: data.name,
        score: data.score,
      }).save(function (err, party) {
        if (err) {
          console.log(err);
        } else {
          console.log('save best player');
          save = false;
          
        }
      });
    }
  },

  clearRoom: function (room) {
  
    if (partyStarted[room].number === 0) {
      var indexOfRoom = availableRooms.indexOf(room);
      if (indexOfRoom >= 0) {
        availableRooms.splice(indexOfRoom, 1);
      }
      //console.log('delete partyStarted');
      delete partyStarted[room];
    }
  },
  
  deleteSocket: function (socket) {
    delete clients[socket];
    console.log('remove');
    
   
  }
}
var connection = function (socket) {

  socket.on('multiPlayerGame', function (data) {

    var room;
    var index;

    socket.emit('multiPlayerGame', socket.id);
    socket.name = data.user;
    socket.avatar = data.avatar;
    clients[socket.id] = socket;
    room = stagingPoint.joinRoom(socket);
    index = global.players.push(socket.name) - 1;


    socket.on('score', function (data) {
      io.to(room).emit('evolutionScore', data);
    });

    socket.on('scoreFinal', function (data) {
      stagingPoint.result(data)
    });

    socket.on('finish', function (data) {
      //console.log('room'room)

        stagingPoint.register(data)

      
    });

    socket.on('disconnect', function () {
      global.players.splice(index, 1);
      
     partyStarted[room].removePlayer(socket.id);
      stagingPoint.clearRoom(room);
      socket.to(room).emit('deconnection', socket.id);
      stagingPoint.deleteSocket(socket.id);
    });
    socket.on('socketEND', function () {
      global.players.splice(global.players.indexOf(socket.name), 1);
      save = true;
      stagingPoint.deleteSocket(socket.id);
    });
  });
};

io.on('connection', function (socket) {
  console.log('connectionio')
  connection(socket);
});
module.exports = io;
