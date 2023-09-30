//-IMPORTS---------------------------------------------------------->
const utils = require('./utils/utils');
const areaSQL = require('../db/areaSQL');
// const orderSQL = require('../db/orderSQL');
// const mokkiSQL = require('../db/mokkiSQL');
//-------------------------------------------------------------------



module.exports = {
    // Hakee kaikki alueet
    fetchArea: async (req, res) => {
        try {
            const { alue_id, nimi } = req.query;

            let c = await areaSQL.fetch({ alue_id, nimi });
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Alueen lisäys
    insertArea: async (req, res) => {
        try {
            let { nimi } = req.body;

            // tarkistus: onko alue jo kannassa
            const areaExists = await areaSQL.fetch({ nimi: nimi });
            if (areaExists.length > 0) {
                utils.createErrorMessage(res, "Kyseisellä nimellä oleva toimipiste on jo olemassa");
                return;
            }

            let result = await areaSQL.insert(nimi);

            console.log(result) //--------->

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Alueen poisto id:llä
    deleteArea: async (req, res) => {
        try {
            const avain = req.params.avain;

            let result = await areaSQL.delete(avain);

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },
}