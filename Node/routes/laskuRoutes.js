//-IMPORTS---------------------------------------------------------->
var express = require('express');
var app = express();
var router = express.Router();
//-------------------------------------------------------------------


let ctrl = require('../controllers/laskuController');

router.route('/api/lasku').
    get(ctrl.fetchLasku).
    post(ctrl.insertLasku);

router.route('/api/lasku/viimeisin').
    get(ctrl.fetchLatest);

router.route('/api/lasku/:avain').
    delete(ctrl.deleteLasku).
    put(ctrl.updateLasku);


module.exports = router;