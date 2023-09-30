//-IMPORTS---------------------------------------------------------->
var express = require('express');
var app = express();
var router = express.Router();
//-------------------------------------------------------------------


let ctrl = require('../controllers/mokkiController');

router.route('/api/mokki').
    get(ctrl.fetchMokki).
    post(ctrl.insertMokki);

router.route('/api/mokki/:avain').
    delete(ctrl.deleteMokki).
    put(ctrl.updateMokki);

router.route('/api/mokki/vapaat').
    get(ctrl.fetchVapaatMokit);


module.exports = router;