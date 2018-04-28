window.onload = function () {

    var GAME;
    var FIRST;
    var SECOND;
    var room;
    var changement = false;
    var x = 0;
    var y = 0;
    var color = {
        first: 'yellow',
        second: 'red'
    }
    var size = 100;

    /***************************Show the property of the other player in my view****************************/
    var playerDispatch = function () {

        $('.' + GAME.players[FIRST].id + ' .property .name').text(GAME.players[FIRST].name);
        $('.' + GAME.players[FIRST].id + ' .property .score').text(GAME.players[FIRST].score);
        $('.' + GAME.players[FIRST].id + ' .persoImg img').attr('src', '/images/' + GAME.players[FIRST].avatar + '.png');

        $('.' + GAME.players[SECOND].id + ' .property .name').text(GAME.players[SECOND].name);
        $('.' + GAME.players[SECOND].id + ' .property .score').text(GAME.players[SECOND].score);
        $('.' + GAME.players[SECOND].id + ' .persoImg img').attr('src', '/images/' + GAME.players[SECOND].avatar + '.png');

    };
    var phase = {
        one: function () {/*ANIMATED DOT ON WAITING MESSAGE*/
            var points = [
                ' .',
                ' . .',
                ' . . .'
            ];
            var evo = 0;
            var functionInterval1 = setInterval(interVal1, 1000);

            function interVal1() {
                if (changement) {
                    clearInterval(functionInterval1);
                }
                if (evo === 3) {
                    evo = 0;
                }
                document.getElementById('message').innerHTML = points[evo];
                evo++;
            }
        },
        two: function () {/*ANIMATED 3 2 1 START*/
            changement = true;
            var evo2 = 0;

            var points = [
                ' 3',
                ' 2',
                ' 1'
            ];
            document.getElementById('waitingMessage').textContent = "La partie commence dans";


            var functionInterval2 = setInterval(interVal2, 1000);

            function interVal2() {
                if (evo2 > 2) {
                    document.getElementById('rules').style.display = "none";
                    document.getElementById('circle').style.display = "block";
                    socket.emit('playerReady', 'ready');
                    clearInterval(functionInterval2);
                } else {
                    document.getElementById('message').innerHTML = points[evo2];
                    evo2++;
                }
            }
        },
        timer: function () {/*TIMER 15 SECONDE PAR PARTY*/
            document.getElementById('timer').style.display = 'block';

            var timer = 30;
            var functionInterval1 = setInterval(interVal1, 1000);

            function interVal1() {

                if (timer === 0) {
                    clearInterval(functionInterval1);
                    document.getElementById('timer').style.display = 'none';
                    document.getElementById('circle').style.display = 'none';
                    document.getElementById('rules').style.display = 'block';
                    var evolutionScore = {
                        namePlayer: GAME.players[FIRST].name,
                        scorePlayer: GAME.players[FIRST].score,
                        namePlayer2: GAME.players[SECOND].name,
                        scorePlayer2: GAME.players[SECOND].score,
                        room: room,
                    }
                    socket.emit('scoreFinal', evolutionScore);
                }
                document.getElementById('timer').innerHTML = timer + ' SECONDES';
                timer--;
            }
        },
        end: function () {/*END PARTY and RECHARGE WINDOW*/
            socket.emit('socketEND');
            var finishLine = setTimeout(function () {
                
                location.replace(window.location);
            }, 5000);
        }
    }
    
    var creationPersonnage = {
        insertDiv : function (id, color, back) {
            var x = 0;y = 0;
            var div = window.document.createElement('div');
            div.id = id;
            div.style.left = (x - (size / 2)) + 'px';
            div.style.top = (y + (size / 2)) + 'px';
            div.style.border = 10 +'px solid '+ color;
            div.style.borderRadius = 50+'%';
            div.style.zIndex = 1000000;
            div.style.width = size + 'px';
            div.style.height = size + 'px';
            div.style.position = 'absolute';
            div.style.backgroundImage = 'url("/images/'+back+'.png")';
            div.style.backgroundSize = 'cover';
            window.document.body.appendChild(div);
        },
        updateDivPosition : function (event, id) {
            
            var div = window.document.getElementById(id);
            if (div) {
                var newLeft = (event.x - 10);
                var newTop = (event.y + 10);
                if (newLeft < 0) {
                    newLeft = 0;
                }
                if (newTop < 0) {
                    newTop = 0;
                }
                if ((newLeft + (size)) > document.documentElement.clientWidth) {
                    newLeft = document.documentElement.clientWidth - (size);
                }
                if ((newTop + (size)) > document.documentElement.clientHeight) {
                    newTop = document.documentElement.clientHeight - (size);
                }
                div.style.top = newTop + 'px';
                div.style.left = newLeft + 'px';
            }
        }
    };
    

    /*************************** function give or take points****************************/
    var clickPlay = function () {

        $('.yellow').on('click', function () {
            
            GAME.players[FIRST].score = GAME.players[FIRST].score + 1;
            var evolutionScore = {
                idPlayer: GAME.players[FIRST].id,
                scorePlayer: GAME.players[FIRST].score,
            }

            socket.emit('score', evolutionScore);
            
        })
        $('.red').on('click', function () {

            $(".red").css('box-shadow', '0', '5px', '42px', 'rgba(0, 0, 0, 0.5)');
            GAME.players[FIRST].score = GAME.players[FIRST].score - 1;
            playerDispatch()
            var evolutionScore = {
                idPlayer: GAME.players[FIRST].id,
                scorePlayer: GAME.players[FIRST].score,
            }
            socket.emit('score', evolutionScore);
        })
    }

    var touchPlay = function () {
            var perso1 = document.getElementById(FIRST);
            perso1X = window.getComputedStyle(perso1, null).getPropertyValue("left");
            perso1Y = window.getComputedStyle(perso1, null).getPropertyValue("top"); 
            perso1X = parseFloat(perso1X);
            perso1Y = parseFloat(perso1Y);
            console.log('^perso1X '+ perso1X)
            perso1Width = parseFloat(perso1.style.width);
            perso1Height = parseFloat(perso1.style.height);

            var perso2 = document.getElementById(SECOND);
            perso2X = window.getComputedStyle(perso2, null).getPropertyValue("left");
            perso2Y = window.getComputedStyle(perso2, null).getPropertyValue("top");
            perso2X = parseFloat(perso2X);
            perso2Y = parseFloat(perso2Y);
            perso2Width = parseFloat(perso2.style.width);
            console.log('^persoX ' + perso2Width)
            perso2Height = parseFloat(perso2.style.height);

            if (perso1X < perso2X + perso2Width && perso1X + perso1Width > perso2X && perso1Y < perso2Y + perso2Height && perso1Height + perso1Y > perso2Y) {

                document.getElementById(FIRST).style.left = perso1X - 300 +'px';
                document.getElementById(SECOND).style.left = perso2X + 300 + 'px';
                console.log('collision')
                console.log(document.getElementById(FIRST).style.left)

            }        
    }



    var socket = io.connect();
    /***************************Start****************************/


    var connection = function () {

        /*send to server form value*/
        var identification = document.getElementsByClassName('name')[0].textContent;
        var avatarChoosen = document.getElementsByTagName('img')[0].alt;

        var description = {
            user: identification,
            avatar: avatarChoosen
        }

        socket.emit('multiPlayerGame', description);


        socket.on('multiPlayerGame', function (data) {
            //console.log(data)
            FIRST = data;
            var giveClass = document.getElementsByClassName('first');
            giveClass[0].classList.add(data);
        });
        /*join room display waiting area*/
        socket.on('joinRoom', function (data) {
            console.log('Joined room:', data);
            room = data;
            phase.one();
            console.log('first' + avatarChoosen)
                /*my perso on the mouse*/
                creationPersonnage.insertDiv(FIRST, color.first, avatarChoosen);
                
                window.document.addEventListener('mousemove', function (event) {
                    var event = {
                        x: event.clientX,
                        y: event.clientY,
                    }
                    creationPersonnage.updateDivPosition(event, FIRST);
                    /*send my position to the other player*/
                    socket.emit('myPlayer', event)
                });
            
                
        });
        
        /*two player in the room display game area and players property*/
        socket.on('roomFull', function (data) {
            console.log('roomFull', data);
            GAME = Object.create(data);
            for (id in GAME.players) {
                if (id !== FIRST) {
                    SECOND = id;
                    console.log('second' + SECOND)
                    var giveClass2 = document.getElementsByClassName('second');
                    giveClass2[0].classList.add(id);
                }
            }
            /*creation secondplayer div character*/
            creationPersonnage.insertDiv(SECOND, color.second, GAME.players[SECOND].avatar );
            playerDispatch();
            phase.two();

        });

        socket.on('playerMove', function (events) {
            /*receive the position from the other player*/
            var coords = events;
            console.log('events'+events)
            creationPersonnage.updateDivPosition(coords, SECOND);
        });

        /***************************Party started****************************/
        socket.on('letSGo', function (data, events) {
            
            clickPlay();
            touchPlay();
            var startTimer = setTimeout(function () {
                phase.timer();
            }, 3100);

        });
        /***************************Evolution other player score in my view****************************/
        socket.on('evolutionScore', function (data, events) {
            console.log(data)
            $('.' + GAME.players[data.idPlayer].id + ' .property .score').text(data.scorePlayer);
            GAME.players[data.idPlayer].score = data.scorePlayer;
        });
        /***************************Close the party an give the WINNER****************************/
        socket.on('result', function (data) {
            console.log(data);
            var value = data;
            if (value.name !== undefined) {
                document.getElementById('waitingMessage').textContent = "Le vainqueur est " + value.name;
                document.getElementById('message').textContent = "avec " + value.score + " points";
                console.log( '1 '+ FIRST)
                console.log('2 ' +SECOND)
                console.log('3 ' +room)
                console.log('4 ' + GAME)

                //console.log('5 ' + Game)
                value.room = room;
                socket.emit('finish', value);
                phase.end();
            }
            if (value.egal !== undefined) {
                document.getElementById('waitingMessage').textContent = "Vous êtes à égalité";
                document.getElementById('message').textContent = "avec " + value.egal + " points";

                phase.end()
            }
        });

        socket.on('deconnection', function (game) {

            document.getElementById('rules').style.display = "block";
            document.getElementById('circle').style.display = "none";
            document.getElementById('waitingMessage').textContent = "Le second joueur s'est déconnecté";
            document.getElementById('message').textContent = "La page actuel va se recharger automatiquement";
            phase.end()

        });
    };
connection();
};
