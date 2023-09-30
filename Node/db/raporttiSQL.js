//-IMPORTS---------------------------------------------------------->
var utils = require('./utils/dbutils');
//-------------------------------------------------------------------



const fetchMajoittuminen_raportti = ({ alkamisaika, loppumisaika, alue }) => {
    let params = [];
    let query = `SELECT * FROM majoittuminen_raportti WHERE 1 = 1 `;

    if (alkamisaika) {
        query += ` AND loppumisaika >= '${alkamisaika}' `;
        params.push(alkamisaika);
    }
    if (loppumisaika) {
        query += ` AND alkamisaika <= '${loppumisaika}' `;
        params.push(loppumisaika);
    }
    if (alue) {
        query += ` AND alue LIKE '%${alue}%' `;
        params.push(alue);
    }
    return utils.executeSQL(query, params);
}


const fetchLisapalvelut_raportti = ({ alkamisaika, loppumisaika, alue }) => {
    let params = [];
    let query = `SELECT * FROM lisapalvelut_raportti WHERE 1 = 1 `;

    if (alkamisaika) {
        query += ` AND loppumisaika >= '${alkamisaika}' `;
        params.push(alkamisaika);
    }
    if (loppumisaika) {
        query += ` AND alkamisaika <= '${loppumisaika}' `;
        params.push(loppumisaika);
    }
    if (alue) {
        query += ` AND alue LIKE '%${alue}%' `;
        params.push(alue);
    }
    return utils.executeSQL(query, params);
}



module.exports = {
    fetchMajoittuminen: (alkamisaika, loppumisaika, alue) => {
        return fetchMajoittuminen_raportti(alkamisaika, loppumisaika, alue);
    },

    fetchLisapalvelut: (alkamisaika, loppumisaika, alue) => {
        return fetchLisapalvelut_raportti(alkamisaika, loppumisaika, alue);
    },
}