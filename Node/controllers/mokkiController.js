//-IMPORTS---------------------------------------------------------->
const utils = require('./utils/utils');
// const customerSQL = require('../db/customerSQL');
// const orderSQL = require('../db/orderSQL');
const mokkiSQL = require('../db/mokkiSQL');
const postiSQL = require('../db/postiSQL');
const areaSQL = require('../db/areaSQL');
//-------------------------------------------------------------------



module.exports = {
    // Hakee kaikki mökit + posti + alue + palvelut
    fetchMokki: async (req, res) => {
        try {
            const { mokki_id, alue_id, alue, mokkinimi, katuosoite, postinro, toimipaikka, hinta, henkilomaara } = req.query;

            let c = await mokkiSQL.fetch({ mokki_id, alue_id, alue, mokkinimi, katuosoite, postinro, toimipaikka, hinta, henkilomaara });
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    fetchVapaatMokit: async (req, res) => {
        try {
            const { alue_id, henkilomaara, tulopaiva, lahtopaiva } = req.query;

            let c = await mokkiSQL.fetchVapaatMokit({ alue_id, henkilomaara, tulopaiva, lahtopaiva });
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Poistaa mökin id:llä
    deleteMokki: async (req, res) => {
        try {
            const avain = req.params.avain;

            let result = await mokkiSQL.delete(avain);

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Mökin lisäys
    insertMokki: async (req, res) => {
        try {
            let { alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu, toimipaikka, alue } = req.body;

            // tarkistus: onko mökki jo kannassa
            const mokkiExists = await mokkiSQL.fetch({ mokkinimi: mokkinimi, katuosoite: katuosoite });
            if (mokkiExists.length > 0) {
                utils.createErrorMessage(res, `Mökki on jo olemassa`);
                return;
            }

            // aluen tarkistus ja lisäys jos ei löytynyt
            if (alue_id) {
                const p = await areaSQL.isExists(alue_id);
                if (p.length == 0) {
                    if (!alue) {
                        utils.createErrorMessage(res, "Pakollisia tietoja puuttuu: alue");
                        return;
                    }
                    else {
                        const r = await areaSQL.insert(alue_id, alue);
                    }
                }
            }

            // postinumeron tarkistus ja lisäys jos ei löytynyt
            if (postinro) {
                const p = await postiSQL.fetchSinglePostinro(postinro);
                if (p) postinro = p.postinro;
                else {
                    if (!toimipaikka) {
                        utils.createErrorMessage(res, "Pakollisia tietoja puuttuu: postitoimipaikka");
                        return;
                    }
                    const r = await postiSQL.insertPosti(postinro, toimipaikka);
                }
            }

            let result = await mokkiSQL.insert({ alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu });

            console.log(result) //--------->

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Mökin muokkaus
    updateMokki: async (req, res) => {
        try {
            let { alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu, toimipaikka, alue } = req.body;
            let avain = req.params.avain;

            // tarkistus: onko mökki jo kannassa
            // const mokkiExists = await mokkiSQL.fetch({ mokkinimi: mokkinimi, katuosoite: katuosoite, alue: alue });
            // if (mokkiExists.length > 0) {
            //     utils.createErrorMessage(res, `Mökki on jo olemassa`);
            //     return;
            // }

            // aluen tarkistus ja lisäys jos ei löytynyt
            if (alue_id) {
                const p = await areaSQL.isExists(alue_id);
                if (p.length == 0) {
                    if (!alue) {
                        utils.createErrorMessage(res, "Pakollisia tietoja puuttuu: alue");
                        return;
                    }
                    else {
                        const r = await areaSQL.insert(alue_id, alue);
                    }
                }
            }

            // postinumeron tarkistus ja lisäys jos ei löytynyt
            if (postinro) {
                const p = await postiSQL.fetchSinglePostinro(postinro);
                if (p) postinro = p.postinro;
                else {
                    if (!toimipaikka) {
                        utils.createErrorMessage(res, "Pakollisia tietoja puuttuu: postitoimipaikka");
                        return;
                    }
                    const r = await postiSQL.insertPosti(postinro, toimipaikka);
                }
            }

            let result = await mokkiSQL.update({ avain, alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu })

            res.statusCode = 204;
            res.json()

            console.log(result) //--------->

        } catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },
}