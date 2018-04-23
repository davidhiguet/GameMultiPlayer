var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Party = require('../bdd/Party');
const db = require('db');



router.get('/', function (req, res, next) {
    Party.find().sort({ score: -1 }).limit(10).exec(function (err, party) {
        if (err) {
            console.log(err);
            party = [];
        }

        if (req.session && req.session.user && req.session.avatar) {
            
            let username = req.session.user;
            let myAvatar = req.session.avatar;
            delete req.session.user;
            delete req.session.avatar;
            res.render('multiPlayerGame', { party, user: username, myAvatar});
            
        } else {
            res.render('multiPlayerConnection', { party });
        }
    });
});


router.post('/', function (req, res, next) {
    Party.find().sort({ score: -1 }).limit(10).exec(function (err, party) {
    if (err) {
        console.log(err);
        party = [];
    }
        
        if (req.body && req.body.pseudo && req.body.avatar && global.players.indexOf(req.body.pseudo) === -1) {
            req.session.user = req.body.pseudo;
            req.session.avatar = req.body.avatar;
            res.redirect('/multiPlayerGame');
            
        } else {

            if (global.players.indexOf(req.body.pseudo) !== -1) {
                message = 'Ce pseudo est déjà pris !!!';
            }
            res.render('multiPlayerConnection', { party, message: message });
        }
    });
});
 
module.exports = router;