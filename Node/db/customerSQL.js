//-IMPORTS---------------------------------------------------------->
var utils = require('./utils/dbutils');
//-------------------------------------------------------------------



const deleteCustomer = (id) => {
    let query = `DELETE FROM asiakas WHERE asiakas_id = ?`;
    return utils.executeSQL(query, [id]);
}


const fetchCustomerOrders = ({ varaus_id, etunimi, sukunimi }) => {
    let params = [];
    let query = `SELECT p.toimipaikka,a.etunimi, a.asiakas_id,a.sukunimi,a.lahiosoite, a.postinro,a.email,a.puhelinnro,a.sahkopostilasku,a.paperilasku, v.varaus_id, v.varattu_alkupvm, v.varattu_loppupvm,m.mokkinimi,l.summa, al.nimi
                 FROM asiakas a , varaus v, mokki m, lasku l,posti p, alue al
                 WHERE a.asiakas_id = v.asiakas_asiakas_id 
                 AND m.mokki_id = v.mokki_mokki_id 
                 AND l.varaus_id = v.varaus_id
                 AND a.postinro=p.postinro
                 AND al.alue_id=m.alue_id
                  `;

    if (varaus_id) {
        query += ` AND v.varaus_id = '${varaus_id}' `;
        params.push(etunimi);
    }

    if (etunimi) {
        query += ` AND a.etunimi LIKE '${etunimi}%' `;
        params.push(etunimi);
    }
    if (sukunimi) {
        query += ` AND a.sukunimi LIKE '${sukunimi}%' `;
        params.push(sukunimi);
    }

    return utils.executeSQL(query, params)
}


const fetchCustomer = ({ etunimi, sukunimi, lahiosoite, postinro }) => {
    let params = [];
    let query = `SELECT a.asiakas_id, a.etunimi, a.sukunimi, a.lahiosoite, a.postinro, a.email, a.puhelinnro
                 FROM asiakas a
                 WHERE 1 = 1 `;

    if (etunimi) {
        query += ` AND a.etunimi = '${etunimi}' `;
        params.push(etunimi);
    }
    if (sukunimi) {
        query += ` AND a.sukunimi = '${sukunimi}' `;
        params.push(sukunimi);
    }
    if (lahiosoite) {
        query += ` AND a.lahiosoite = '${lahiosoite}' `;
        params.push(lahiosoite);
    }
    if (postinro) {
        query += ` AND a.postinro = '${postinro}' `;
        params.push(postinro);
    }
    console.log("SQL fetcAsiakas query: " + query);
    // if (email) {
    //     query += ` AND a.email LIKE '${email}%' `;
    //     params.push(email);
    // }
    // if (puhelinnro) {
    //     query += ` AND a.puhelinnro LIKE '${puhelinnro}%' `;
    //     params.push(puhelinnro);
    // }

    return utils.executeGetSingleSQL(query, params)
}


const insertCustomer = ({ sahkopostilasku, paperilasku, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro }) => {
    let query = `INSERT INTO asiakas (sahkopostilasku, paperilasku, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;
    return utils.executeSQL(query, [sahkopostilasku, paperilasku, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro])
}


const updateCustomer = ({ postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro, avain }) => {
    let query = `UPDATE asiakas SET postinro=?, etunimi=?, sukunimi=?, lahiosoite=?, email=?, puhelinnro=? 
                 WHERE asiakas_id=? `;
    return utils.executeSQL(query, [postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro, avain])
}



module.exports = {

    fetch: (etunimi, sukunimi, lahiosoite, postinro) => {
        return fetchCustomer( etunimi, sukunimi, lahiosoite, postinro);
    },
    
    fetchCustomerOrders: (varaus_id, etunimi, sukunimi) => {
        return fetchCustomerOrders(varaus_id, etunimi, sukunimi);
    },

    delete: (id) => {
        return deleteCustomer(id);
    },

    insert: (postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro) => {
        return insertCustomer(postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro);
    },

    update: (avain, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro) => {
        return updateCustomer(avain, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro);
    },
}
