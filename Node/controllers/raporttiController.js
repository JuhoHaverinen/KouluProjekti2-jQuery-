//-IMPORTS---------------------------------------------------------->
const utils = require('./utils/utils');
const raporttiSQL = require('../db/raporttiSQL');
//-------------------------------------------------------------------



module.exports = {
    // Majoittumisen raportti
    fetchMajoittuminen: async (req, res) => {
        try {
            const { alkamisaika, loppumisaika, alue } = req.query;

            let c = await raporttiSQL.fetchMajoittuminen({ alkamisaika, loppumisaika, alue });
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Lisäpalvelut raportti
    fetchLisapalvelut: async (req, res) => {
        try {
            const { alkamisaika, loppumisaika, alue } = req.query;

            let c = await raporttiSQL.fetchLisapalvelut({ alkamisaika, loppumisaika, alue });
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },
}