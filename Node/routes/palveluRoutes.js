//-IMPORTS---------------------------------------------------------->
var express = require('express');
var app = express();
var router = express.Router();
//-------------------------------------------------------------------


let ctrl = require('../controllers/palveluController');


router.route('/api/palvelu/').
    get(ctrl.fetchPalvelu).
    post(ctrl.insertPalvelu);

router.route('/api/palvelu/:avain').
    delete(ctrl.deletePalvelu).
    put(ctrl.updatePalvelu).
    get(ctrl.fetchPalveluByID);


module.exports = router;