var express = require('express');
var router = express.Router();

/* GET CURRICULUM VITAE. */
router.get('/', function (req, rep) {
    rep.render('cv');
})

module.exports = router;