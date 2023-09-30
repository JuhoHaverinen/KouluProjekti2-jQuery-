//-IMPORTS---------------------------------------------------------->
var express = require('express');
var app = express();
var router = express.Router();
//-------------------------------------------------------------------


let ctrl = require('../controllers/raporttiController');

router.route('/api/majoittuminen').
    get(ctrl.fetchMajoittuminen);

router.route('/api/lisapalvelut').
    get(ctrl.fetchLisapalvelut);

module.exports = router;