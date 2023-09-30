//-IMPORTS---------------------------------------------------------->
const utils = require('./utils/utils');
const laskuSQL = require('../db/laskuSQL');
const orderSQL = require('../db/orderSQL');
//-------------------------------------------------------------------



module.exports = {
    // Hakee kaikki laskut
    fetchLasku: async (req, res) => {
        try {
            const { lasku_id, varaus_id, asiakas_id, asiakas, summa, completed } = req.query;

            let c = await laskuSQL.fetch({ lasku_id, varaus_id, asiakas_id, asiakas, summa, completed });
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },
    fetchLatest: async (req, res) => {
        try {
            let c = await laskuSQL.fetchLatest();
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Poistaa laskun id:llä
    deleteLasku: async (req, res) => {
        try {
            const avain = req.params.avain;

            let result = await laskuSQL.delete(avain);

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Laskun lisäys
    insertLasku: async (req, res) => {
        try {
            let { varaus_id, summa, erapaiva } = req.body;
            let alv = summa - (summa / 1.24);
            alv = Math.round((alv + Number.EPSILON) * 100) / 100;

            let result = await laskuSQL.insert({ varaus_id, summa, alv, erapaiva });

            console.log(result) //--------->

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Laskun muokkaus
    updateLasku: async (req, res) => {
        try {
            let { varaus_id, summa, erapaiva, completed } = req.body;
            let avain = req.params.avain;
            let alv = summa - (summa / 1.24);
            alv = Math.round((alv + Number.EPSILON) * 100) / 100;

            // tarkistus: onko lasku jo kannassa
            const laskuExists = await laskuSQL.fetch({ varaus_id: varaus_id, summa: summa, completed: completed });
            if (laskuExists.length > 0) {
                utils.createErrorMessage(res, "Lasku on jo kannassa!");
                return;
            }

            let result = await laskuSQL.update({ varaus_id, summa, alv, erapaiva, completed, avain })

            res.statusCode = 204;
            res.json()

            console.log(result) //--------->

        } catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },
}