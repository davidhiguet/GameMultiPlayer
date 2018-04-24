const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
const session = require('express-session');
var bodyParser = require('body-parser');


var home = require('./routes/index');
var frontGame = require('./routes/frontGame');
var cv = require('./routes/cv');
var maps= require('./routes/maps');
var multiPlayerGame = require('./routes/multiPlayerGame');

var app = express();


const pug = require('pug');
app.set('view engine', 'pug');

app.use(session({
    secret: 'secretsecretIhavegotasecret',
    saveUninitialized: false,
    resave: false
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));


app.use('/', home);
app.use('/frontGame', frontGame);
app.use('/cv', cv);
app.use('/maps', maps);
app.use('/multiPlayerGame', multiPlayerGame);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    next();
});

// error handler
app.use(function (err, req, res, next) { 
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var app = express();
process.on('SIGINT', function () {
    db.close(function () {
        process.exit(0);
    });
});
app.io = require('./socketServer');

module.exports = app;

