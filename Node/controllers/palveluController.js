//-IMPORTS---------------------------------------------------------->
const utils = require('./utils/utils');
const palveluSQL = require('../db/palveluSQL');
// const orderSQL = require('../db/orderSQL');
// const mokkiSQL = require('../db/mokkiSQL');
//-------------------------------------------------------------------



module.exports = {
    // HUOM!
    // Jätin tämän sen takia kun en jaksanut tutkia miten tämä vaikuttaa Frontin puolella.
    // Eipähän mee sekaisin ;)
    // HUOM!
    // Hakee kaikki alueet id:llä
    fetchPalveluByID: async (req, res) => {
        try {
            let avain = req.params.avain;

            let c = await palveluSQL.fetchPalveluByID(avain);
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Hakee kaikki palvelut + alue (LIKE)
    fetchPalvelu: async (req, res) => {
        try {
            const { palvelu_id, alue_id, alue, nimi, tyyppi, kuvaus, hinta, alv } = req.query;

            let c = await palveluSQL.fetch({ palvelu_id, alue_id, alue, nimi, tyyppi, kuvaus, hinta, alv });
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Palvelun lisäys
    insertPalvelu: async (req, res) => {
        try {
            let { alue_id, nimi, tyyppi, kuvaus, hinta } = req.body;
            let alv = hinta - (hinta / 1.24);
            alv = Math.round((alv + Number.EPSILON) * 100) / 100;

            // tarkistus: onko palvelu jo kannassa
            const palveluExists = await palveluSQL.fetch({ alue_id: alue_id, nimi: nimi, tyyppi: tyyppi });
            if (palveluExists.length > 0) {
                utils.createErrorMessage(res, "Palvelu on jo kannassa!");
                return;
            }

            let result = await palveluSQL.insert({ alue_id, nimi, tyyppi, kuvaus, hinta, alv });

            console.log(result) //--------->

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Poistaa palvelun id:llä
    deletePalvelu: async (req, res) => {
        try {
            const avain = req.params.avain;

            let result = await palveluSQL.delete(avain);

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Palvelun muokkaus
    updatePalvelu: async (req, res) => {
        try {
            let { alue_id, nimi, tyyppi, kuvaus, hinta } = req.body;
            let avain = req.params.avain;
            let alv = hinta - (hinta / 1.24);
            alv = Math.round((alv + Number.EPSILON) * 100) / 100;


            // tarkistus: onko palvelu jo kannassa // TURHA ?!
            // const palveluExists = await palveluSQL.fetch({ alue_id: alue_id, nimi: nimi, tyyppi: tyyppi, kuvaus: kuvaus, hinta: hinta });
            // if (palveluExists.length > 0) {
            //     utils.createErrorMessage(res, "Palvelu on jo kannassa!");
            //     return;
            // }

            let result = await palveluSQL.update({ alue_id, nimi, tyyppi, kuvaus, hinta, alv, avain })

            res.statusCode = 204;
            res.json()

            console.log(result) //--------->

        } catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },
}