//-IMPORTS---------------------------------------------------------->
var utils = require('./utils/dbutils');
//-------------------------------------------------------------------



const fetchVapaatMokit = ({ alue_id, henkilomaara, tulopaiva, lahtopaiva }) => {
    tulopaiva += " 00:00:00";
    lahtopaiva += " 00:00:00";
    let query = `SELECT m.mokki_id, m.alue_id, a.nimi AS 'alue', m.mokkinimi, 
                m.hinta, m.kuvaus AS 'mökinkuvaus', m.henkilomaara,m.kuvaus,m.katuosoite
                FROM mokki m
                LEFT JOIN alue a ON a.alue_id = m.alue_id
                WHERE not EXISTS (SELECT NULL FROM Varaus
                    WHERE m.mokki_id = mokki_mokki_id
                    AND (varattu_alkupvm < '${lahtopaiva}'
                    AND varattu_loppupvm > '${tulopaiva}' )) 
                AND m.henkilomaara >= ${henkilomaara} 
                AND m.alue_id = ${alue_id}`;
                console.log(query);
    return utils.executeSQL(query)
}

const fetchMokki = ({ mokki_id, alue_id, alue, mokkinimi, katuosoite, postinro, toimipaikka, hinta, henkilomaara }) => {
    let params = [];
    let query = `SELECT m.mokki_id, m.alue_id, a.nimi AS 'alue', m.mokkinimi, m.katuosoite,
                        m.postinro, p.toimipaikka, m.hinta, m.kuvaus AS 'mökinkuvaus', m.henkilomaara, m.varustelu, 
                        pa.nimi AS 'palvelut', pa.kuvaus AS 'palvelunkuvaus' 
                FROM mokki m
                LEFT JOIN alue a ON a.alue_id = m.alue_id
                LEFT JOIN palvelu pa ON a.alue_id = pa.alue_id
                LEFT JOIN posti p ON p.postinro = m.postinro 
                WHERE 1 = 1 `;
   
    if (mokki_id) {
        query += ` AND m.mokki_id LIKE ? `;
        params.push(mokki_id);
    }
    if (alue_id) {
        query += ` AND m.alue_id LIKE ? `;
        params.push(alue_id);
    }
    if (alue) {
        query += ` AND a.nimi LIKE '${alue}%' `;
        params.push(alue);
    }
    if (mokkinimi) {
        query += ` AND m.mokkinimi LIKE '${mokkinimi}%' `;
        params.push(mokkinimi);
    }
    if (katuosoite) {
        query += ` AND m.katuosoite LIKE '${katuosoite}%' `;
        params.push(katuosoite);
    }
    if (postinro) {
        query += ` AND m.postinro LIKE '${postinro}%' `;
        params.push(postinro);
    }
    if (toimipaikka) {
        query += ` AND p.toimipaikka LIKE '${toimipaikka}%' `;
        params.push(toimipaikka);
    }
    if (hinta) {
        query += ` AND m.hinta LIKE '${hinta}%' `;
        params.push(hinta);
    }
    if (henkilomaara) {
        query += ` AND m.henkilomaara LIKE '${henkilomaara}%' `;
        params.push(henkilomaara);
    }

    query += ` ORDER BY a.nimi, m.katuosoite `

    return utils.executeSQL(query, params)
}


const deleteMokki = (id) => {
    let query = `DELETE FROM mokki WHERE mokki_id = ?`;
    return utils.executeSQL(query, [id]);
}


const insertMokki = ({ alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu }) => {
    let query = `INSERT INTO mokki (alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;
    return utils.executeSQL(query, [alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu])
}


const updateMokki = ({ alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu, avain }) => {
    let query = `UPDATE mokki SET alue_id=?, postinro=?, mokkinimi=?, katuosoite=?, hinta=?, kuvaus=?, henkilomaara=?, varustelu=? 
                 WHERE mokki_id=? `;
    return utils.executeSQL(query, [alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu, avain])
}



module.exports = {

    fetch: (mokki_id, alue_id, alue, mokkinimi, katuosoite, postinro, toimipaikka, henkilomaara) => {
        return fetchMokki(mokki_id, alue_id, alue, mokkinimi, katuosoite, postinro, toimipaikka, henkilomaara);
    },

    fetchVapaatMokit: (alue_id, henkilomaara, tulopaiva, lahtopaiva) => {
        return fetchVapaatMokit(alue_id, henkilomaara, tulopaiva, lahtopaiva);
    },

    delete: (id) => {
        return deleteMokki(id);
    },

    insert: (alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu) => {
        return insertMokki(alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu);
    },

    update: (alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu, avain) => {
        return updateMokki(alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu, avain);
    },
}
