//-IMPORTS---------------------------------------------------------->
var express = require('express');
var app = express();
var router = express.Router();
//-------------------------------------------------------------------


let ctrl = require('../controllers/customerController');

router.route('/api/customer').
    get(ctrl.fetchCustomer).
    post(ctrl.insertCustomer);

router.route('/api/customerorders').
    get(ctrl.fetchCustomerOrders);

router.route('/api/customer/:avain').
    delete(ctrl.deleteCustomer).
    put(ctrl.updateCustomer);

router.route('/api/customer/login').
    get(ctrl.fetchLogin);

module.exports = router;