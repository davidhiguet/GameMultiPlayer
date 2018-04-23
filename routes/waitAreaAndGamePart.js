const uniqueId = function () {
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randomLetter + Date.now();
};



/*
 * On crée un tableau pour enregistrer la liste des carrés
 */
let colorGiven = "yellow";
const persos = {};
let username = [];

res.io.once('connection', function (socket) {

    persosArray = Object.keys(persos).map(key => persos[key]);
    socket.emit('allPersos', persosArray);

    socket.on("createAvatar", function (message) {

        socket.emit('displayFormulaire', message)
    })

    socket.emit("createAvatar", function (data) {

        //console.log(username[0])

        if (username === [] || data.obj.user != username[0] && data.obj.user != '' && data.obj.avatar != undefined) {

            if (username[0] != undefined) {
                colorGiven = "red";
            }
            if (username.indexOf(data.obj.user) == -1) {
                username.push(data.obj.user)
            }

            data.obj.color = colorGiven;

            const myPerso = factoryPerso(colorGiven, data.obj.avatar, data.obj.user);
            persos[socket.id] = myPerso;
            const clientObject = myPerso.getClientObject();
            //console.log(persos[socket.id].name);
            //username.push(persos[socket.id].name)
            //console.log(username[0])
            //console.log(username)
            socket.emit('myPersoCreated', clientObject); // Send square to new player
            socket.broadcast.emit('newPerso', clientObject); // Send square to other players

            socket.emit('waitArea', clientObject);

            //socket.emit('party', clientObject);
        } else {

            socket.emit('displayAgainFormulaire', { replay: 'Pseudo déjà pris où vous n\'avez rien écris!!! RECOMMENCER' })

        }
    });
    socket.on('movePerso', function (coords) {
        // console.log('[moveSquare] socket.id: ', socket.id, coords);
        if (persos[socket.id]) {
            const myPerso = persos[socket.id];
            myPerso.x = coords.x;
            myPerso.y = coords.y;

            // Broadcast new position to all clients
            const clientObject = myPerso.getClientObject();
            //console.log(clientObject);
            res.io.emit('updatePersoPosition', clientObject);
        }
    });
    socket.on('disconnect', (reason) => {
        //console.log('[disconnect]', socket.id, reason);
        if (persos[socket.id] && persos[socket.id].id) {
            const persoId = persos[socket.id].id;
            delete persos[socket.id];
            res.io.emit('removePerso', persoId);
        }
    });
});