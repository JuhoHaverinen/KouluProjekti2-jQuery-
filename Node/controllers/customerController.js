//-IMPORTS---------------------------------------------------------->
const utils = require('./utils/utils');
const customerSQL = require('../db/customerSQL');
const authenticationSQL = require('../db/authenticationSQL');
// const mokkiSQL = require('../db/mokkiSQL');
const postiSQL = require('../db/postiSQL');
//-------------------------------------------------------------------



module.exports = {
    // Hakee kaikki asiakkaat (myös LIKE haku toimii)
    fetchCustomer: async (req, res) => {
        try {
            const { asiakas_id, etunimi, sukunimi, lahiosoite, postinro, email, puhelinnro } = req.query;

            let c = await customerSQL.fetch({ asiakas_id, etunimi, sukunimi, lahiosoite, postinro, email, puhelinnro });
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Hakee admin arvon
    fetchLogin: async (req, res) => {
        try {
            const { login, password } = req.query;
            let admin;

            if (login == null) {
                utils.createErrorMessage(res, 'No login :/');
                return;
            }
            if (password == null) {
                utils.createErrorMessage(res, 'No password :/');
                return;
            }
            if (login == null && password == null) {
                utils.createErrorMessage(res, 'No login / No password :/');
                return;
            }
            else {
                const isAdmin = await authenticationSQL.fetch({ login: login, password: password, admin: 1 });
                admin = isAdmin.admin || 0;

                if (isAdmin.length == 1) {
                    const first = isAdmin[0];
                    admin = first.admin;
                }
                else {
                    utils.createErrorMessage(res, `Käyttäjätunnus tai salasana on väärin`);
                    return;
                }
            }
            console.log(`result: `, admin); //-------->

            res.statusCode = 200;
            res.json(admin);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Hakee asiakkaan tilaukset
    fetchCustomerOrders: async (req, res) => {
        try {
            const { varaus_id, etunimi, sukunimi } = req.query;
            console.log("Haetaan asiakkaan tilaukset:" + varaus_id + "/" + etunimi + "/" + sukunimi);
            let c = await customerSQL.fetchCustomerOrders({ varaus_id, etunimi, sukunimi });
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Poistaa asiakkaan id:llä
    deleteCustomer: async (req, res) => {
        try {
            const avain = req.params.avain;

            let result = await customerSQL.delete(avain);

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Asiakkaan lisäys
    insertCustomer: async (req, res) => {
        try {
            let { postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro, toimipaikka } = req.body;

            // tarkistus: onko asiakas jo kannassa
            const customerExists = await customerSQL.fetch({ etunimi: etunimi, sukunimi: sukunimi, postinro: postinro });
            if (customerExists.length > 0) {
                const first = customerExists[0];
                utils.createErrorMessage(res, `Asiakas ${first.etunimi} ${first.sukunimi} on jo olemassa`);
                return;
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

            let result = await customerSQL.insert({ postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro });

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    // Asiakkaan muokkaus
    updateCustomer: async (req, res) => {
        try {
            let { postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro, toimipaikka } = req.body;
            let avain = req.params.avain;


            // tarkistus: onko asiakas jo kannassa
            const customerExists = await customerSQL.fetch({ etunimi: etunimi, sukunimi: sukunimi, postinro: postinro });
            if (customerExists.length > 0) {
                const first = customerExists[0];
                utils.createErrorMessage(res, `Asiakas ${first.etunimi} ${first.sukunimi} on jo olemassa`);
                return;
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

            let result = await customerSQL.update({ avain, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro })

            res.statusCode = 204;
            res.json()

            console.log(result) //--------->

        } catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },



}