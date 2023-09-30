//-IMPORTS---------------------------------------------------------->
var utils = require('./utils/dbutils');
//-------------------------------------------------------------------



const fetchPalveluByID = (alue_id) => {
    let query = "SELECT palvelu_id, nimi, kuvaus, hinta FROM palvelu WHERE alue_id = " + alue_id;
    return utils.executeSQL(query);
}


const fetchPalvelu = ({ palvelu_id, alue_id, alue, nimi, tyyppi, kuvaus, hinta, alv }) => {
    let params = [];
    let query = `SELECT p.palvelu_id, p.alue_id, a.nimi AS 'alue', p.nimi, p.tyyppi, p.kuvaus, p.hinta, p.alv 
                FROM palvelu p JOIN alue a ON a.alue_id = p.alue_id
                WHERE 1 = 1 `;

    if (palvelu_id) {
        query += ` AND p.palvelu_id LIKE ? `;
        params.push(palvelu_id);
    }
    if (alue_id) {
        query += ` AND p.alue_id LIKE ? `;
        params.push(alue_id);
    }
    if (alue) {
        query += ` AND a.nimi LIKE '${alue}%' `;
        params.push(alue);
    }
    if (nimi) {
        query += ` AND p.nimi LIKE '${nimi}%' `;
        params.push(nimi);
    }
    if (tyyppi) {
        query += ` AND p.tyyppi LIKE ? `;
        params.push(tyyppi);
    }
    if (kuvaus) {
        query += ` AND p.kuvaus LIKE '${kuvaus}%' `;
        params.push(kuvaus);
    }
    if (hinta) {
        query += ` AND p.hinta LIKE '${hinta}%' `;
        params.push(hinta);
    }
    if (alv) {
        query += ` AND p.alv LIKE '${alv}%' `;
        params.push(alv);
    }

    query += ` ORDER BY a.nimi, p.nimi `

    return utils.executeSQL(query, params);
}


const insertPalvelu = ({ alue_id, nimi, tyyppi, kuvaus, hinta, alv }) => {
    let query = `INSERT INTO palvelu (alue_id, nimi, tyyppi, kuvaus, hinta, alv)
                 VALUES (?, ?, ?, ?, ?, ?) `;
    return utils.executeSQL(query, [alue_id, nimi, tyyppi, kuvaus, hinta, alv])
}


const deletePalvelu = (id) => {
    let query = `DELETE FROM palvelu WHERE palvelu_id = ?`;
    return utils.executeSQL(query, [id]);
}
const deletePalveluByVarausId = (varaus_id) => {
    let query = `DELETE FROM varauksen_palvelut WHERE varaus_id = ?`;
    return utils.executeSQL(query, [varaus_id]);
}

const updatePalvelu = ({ alue_id, nimi, tyyppi, kuvaus, hinta, alv, avain }) => {
    let query = `UPDATE palvelu SET alue_id=?, nimi=?, tyyppi=?, kuvaus=?, hinta=?, alv=? 
                 WHERE palvelu_id=? `;
    return utils.executeSQL(query, [alue_id, nimi, tyyppi, kuvaus, hinta, alv, avain])
}



module.exports = {
    fetchPalveluByID,

    fetch: (palvelu_id, alue_id, alue, nimi, tyyppi, kuvaus, hinta, alv) => {
        return fetchPalvelu(palvelu_id, alue_id, alue, nimi, tyyppi, kuvaus, hinta, alv);
    },

    insert: (alue_id, nimi, tyyppi, kuvaus, hinta, alv) => {
        return insertPalvelu(alue_id, nimi, tyyppi, kuvaus, hinta, alv);
    },

    delete: (id) => {
        return deletePalvelu(id);
    },
    deletePalveluByVarausId: (varaus_id) => {
        return deletePalveluByVarausId(varaus_id);
    },

    update: (avain, alue_id, nimi, tyyppi, kuvaus, hinta, alv) => {
        return updatePalvelu(avain, alue_id, nimi, tyyppi, kuvaus, hinta, alv);
    },
}