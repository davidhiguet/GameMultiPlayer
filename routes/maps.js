var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'velo';


router.get('/', function (req, res, next){
    MongoClient.connect(url, function (err, dataBase) {
       
        var collection = dataBase.db(dbName).collection('velibParis');
        collection.find().sort({ name: 1 }).toArray(function (err, data) {

            res.render('maps', {data});
        })
    })
})

module.exports = router;