//-IMPORTS---------------------------------------------------------->
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
// ------------------------------------------------------------------

app.use(bodyParser.json());

console.log("Aloitetaan"); //--------->

var cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(cors);


//-ROUTES-IMPORTS--------------------------------------------------->
//-ASIAKAS-------->
const customerRoutes = require('./routes/customerRoutes')
app.use(customerRoutes);

//-MÖKKI---------->
const mokkiRoutes = require('./routes/mokkiRoutes')
app.use(mokkiRoutes);

//-ALUE----------->
const areaRoutes = require('./routes/areaRoutes')
app.use(areaRoutes);

//-PALVELU-------->
const palveluRoutes = require('./routes/palveluRoutes')
app.use(palveluRoutes);

//-TILAUS--------->
const orderRoutes = require('./routes/orderRoutes')
app.use(orderRoutes);

//-LASKU---------->
const laskuRoutes = require('./routes/laskuRoutes')
app.use(laskuRoutes);

//-RAPORTIT------->
const raporttiRoutes = require('./routes/raporttiRoutes')
app.use(raporttiRoutes);
// ------------------------------------------------------------------



module.exports = app;
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../Front/components/etusivu.html'));
});