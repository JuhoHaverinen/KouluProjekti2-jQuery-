//-IMPORTS---------------------------------------------------------->
const utils = require('./utils/utils');
const customerSQL = require('../db/customerSQL');
const orderSQL = require('../db/orderSQL');
const postiSQL = require('../db/postiSQL');
const laskuSQL = require('../db/laskuSQL');
const palveluSQL = require('../db/palveluSQL');
// const mokkiSQL = require('../db/mokkiSQL');
//-------------------------------------------------------------------


module.exports = {
    // Tilauksen lisäys
    insertOrder: async (req, res) => {
        try {
            let { summa, sahkopostilasku, paperilasku, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro, toimipaikka, mokki_id, tulopaiva, lahtopaiva, lisapalvelut } = req.body;
            // console.log("lisapalvelut: " + lisapalvelut); //--------->
            // console.log("lisapalvelut: " + lisapalvelut[0].palvelu_id); //--------->
            console.log("Postinumero check");
            // Tarkistetaan onko postinumero olemassa ja lisätään tarvittaessa
            const p = await postiSQL.fetchSinglePostinro(postinro);
            // console.log("Postinrmo: " + p); //--------->
            if (p == null) {
                console.log("Postinumero insert " + postinro + "/" + toimipaikka);
                const r = await postiSQL.insertPosti(postinro, toimipaikka);
            }
            let asiakas_asiakas_id = 0;
            
            // Tarkistetaan onko asiakas jo olemassa
            console.log("Asiakas check");
            const asiakas = await customerSQL.fetch({etunimi, sukunimi, lahiosoite, postinro});

            if (asiakas != null) {

                console.log("Asiakas update");
                asiakas_asiakas_id = asiakas.asiakas_id;
                let avain = asiakas.asiakas_id;
                const a = await customerSQL.update({postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro, avain});

            }
            else {
                // Lisätään asiakas
                console.log("Asiakasta ei löytynyt");
                let result = await customerSQL.insert({ sahkopostilasku, paperilasku, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro });
                asiakas_asiakas_id = result.insertId;                
            }
            // Lisätään tilaus
            let varattu_alkupvm = tulopaiva;
            let varattu_loppupvm = lahtopaiva;
            let mokki_mokki_id = mokki_id;
            console.log("Lisätään tilaus: " + asiakas_asiakas_id + " " + mokki_id + " " + tulopaiva + " " + lahtopaiva); //--------->
            let result2 = await orderSQL.insert({ asiakas_asiakas_id, mokki_mokki_id, varattu_alkupvm, varattu_loppupvm });

            // Lisästään lisäpalvelut
            console.log("Lisätään lisäpalvelut"); //--------->
            let varaus_id = result2.insertId;
            for (var i = 0; i < lisapalvelut.length; i++) {
                var lp = lisapalvelut[i];
                // console.log("Lisätään lisäpalvelu: " + lp.palvelu_id); //--------->
                var palvelu_palvelu_id = lp.palvelu_id;
                var lkm = lp.lkm;
                let result3 = await orderSQL.insertService({ varaus_id, palvelu_palvelu_id, lkm });
            }
            let alv = summa - (summa / 1.24);
            alv = Math.round((alv + Number.EPSILON) * 100) / 100;
            console.log("Lisätään lasku " + varaus_id+"/"+summa+"/"+alv);
            // let result3 = await orderSQL.insertService({ asiakas_asiakas_id, mokki_mokki_id, varattu_pvm, vahvistus_pvm, varattu_alkupvm, varattu_loppupvm });
            let result4 = await laskuSQL.insert({varaus_id, summa, alv });
            res.statusCode = 204;
            console.log("Lisätty: " + result2.insertId);
            res.json()
            
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },
    // Poistaa varauksen id:llä
    deleteOrder: async (req, res) => {
        try {
            const varaus_id = req.params.varaus_id;
            console.log("poistetaan lasku " + varaus_id);
            let result = await laskuSQL.deleteLaskuByVarausId(varaus_id);
            console.log("poistetaan lisäpalvelut " + varaus_id);
            result = await palveluSQL.deletePalveluByVarausId(varaus_id);
            console.log("poistetaan varaus" + varaus_id);
            result = await orderSQL.delete(varaus_id);

            res.statusCode = 204;
            res.json()
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },
    updateOrder: async (req, res) => {
        try {
            console.log("Päiviteään varaus");
            
            let { asiakas_id,etunimi, sukunimi, lahiosoite, postinro, email, puhelinnro, toimipaikka, sahkopostilasku, paperilasku } = req.body;
            let varaus_id = req.params.varaus_id;
            console.log("id "+ varaus_id);

            const p = await postiSQL.fetchSinglePostinro(postinro);
            console.log("postinumero löytyi: " + p);
            if (p) postinro = p.postinro;
            else {
                if (!toimipaikka) {
                    utils.createErrorMessage(res, "Pakollisia tietoja puuttuu: postitoimipaikka");
                    return;
                }
                const r = await postiSQL.insertPosti(postinro, toimipaikka);
            }
            console.log("Päivitetään sql kutsu");
            let result = await orderSQL.update({asiakas_id,varaus_id, etunimi, sukunimi, lahiosoite, postinro, email, puhelinnro, toimipaikka, sahkopostilasku, paperilasku  })

            res.statusCode = 204;
            res.json()

            console.log(result) //--------->

        } catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },



}