//-IMPORTS---------------------------------------------------------->
var express = require('express');
var app = express();
var router = express.Router();
//-------------------------------------------------------------------


let ctrl = require('../controllers/orderController');

router.route('/api/tilaus').
    post(ctrl.insertOrder);

router.route('/api/tilaus/:varaus_id').
    delete(ctrl.deleteOrder).
    put(ctrl.updateOrder);


module.exports = router;