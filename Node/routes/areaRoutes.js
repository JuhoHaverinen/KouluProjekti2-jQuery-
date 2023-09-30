//-IMPORTS---------------------------------------------------------->
var express = require('express');
var app = express();
var router = express.Router();
//-------------------------------------------------------------------


let ctrl = require('../controllers/areaController');

router.route('/api/alue').
    get(ctrl.fetchArea).
    post(ctrl.insertArea);

router.route('/api/alue/:avain').
    delete(ctrl.deleteArea);

module.exports = router;