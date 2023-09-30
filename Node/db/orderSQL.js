//-IMPORTS---------------------------------------------------------->
var utils = require('./utils/dbutils');
//-------------------------------------------------------------------

const insertOrder = ({ asiakas_asiakas_id, mokki_mokki_id, varattu_alkupvm, varattu_loppupvm }) => {
    console.log("SQL tilaus: " + asiakas_asiakas_id+ " " + mokki_mokki_id+ " " + varattu_alkupvm+ " " + varattu_loppupvm );
    let query = `INSERT INTO varaus (asiakas_asiakas_id, mokki_mokki_id, varattu_pvm, vahvistus_pvm, varattu_alkupvm, varattu_loppupvm) 
                 VALUES (?, ?, SYSDATE(), SYSDATE(), ?, ?) `;
    return utils.executeSQL(query, [asiakas_asiakas_id, mokki_mokki_id, varattu_alkupvm, varattu_loppupvm])
}
const deleteOrder = (varaus_id) => {
    let query = `DELETE FROM varaus WHERE varaus_id = ?`;
    return utils.executeSQL(query, [varaus_id]);
}
const updateOrder = ({ asiakas_id,varaus_id, etunimi, sukunimi, lahiosoite, postinro, email, puhelinnro, toimipaikka, sahkopostilasku, paperilasku }) => {
    console.log("SQL update tilaus: " + varaus_id);
    let query = `UPDATE asiakas SET etunimi=?, sukunimi=?, lahiosoite=?, postinro=?, email=?, puhelinnro=?, sahkopostilasku=?, paperilasku=? 
    WHERE asiakas_id=? `;
return utils.executeSQL(query, [etunimi, sukunimi, lahiosoite, postinro, email, puhelinnro, sahkopostilasku, paperilasku, asiakas_id])
}

const insertOrderService = ({ varaus_id, palvelu_palvelu_id, lkm }) => {

    let query = `INSERT INTO varauksen_palvelut (varaus_id, palvelu_palvelu_id, lkm) 
                 VALUES (?, ?, ?) `;
    return utils.executeSQL(query, [varaus_id, palvelu_palvelu_id, lkm])
}

module.exports = {

    insert: (asiakas_asiakas_id, mokki_mokki_id, varattu_alkupvm, varattu_loppupvm) => {
        return insertOrder(asiakas_asiakas_id, mokki_mokki_id, varattu_alkupvm, varattu_loppupvm);
    },

    insertService: (varaus_id, palvelu_palvelu_id, lkm ) => {
        return insertOrderService(varaus_id, palvelu_palvelu_id, lkm );
    },
    delete: (varaus_id) => {
        return deleteOrder(varaus_id);
    },
    update: (asiakas_id,varaus_id, etunimi, sukunimi, lahiosoite, postinro, email, puhelinnro, toimipaikka, sahkopostilasku, paperilasku) => {
        return updateOrder(asiakas_id, varaus_id, etunimi, sukunimi, lahiosoite, postinro, email, puhelinnro, toimipaikka, sahkopostilasku, paperilasku);
    },

}
