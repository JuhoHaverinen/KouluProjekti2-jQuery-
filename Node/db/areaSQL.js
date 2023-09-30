//-IMPORTS---------------------------------------------------------->
var utils = require('./utils/dbutils');
//-------------------------------------------------------------------



const isExists = (id) => {
    const query = `SELECT * FROM alue WHERE alue_id = ? `;
    return utils.executeSQL(query, [id])
}


const insertArea = (nimi) => {
    const query = `INSERT INTO alue (nimi) VALUES (?) `;
    return utils.executeSQL(query, [nimi])
}


const fetchArea = ({ alue_id, nimi }) => {
    let params = [];
    let query = `SELECT * FROM alue WHERE 1 = 1 `;

    if (alue_id) {
        query += ` AND alue_id LIKE ? `;
        params.push(alue_id);
    }
    if (nimi) {
        query += ` AND nimi LIKE '${nimi}%' `;
        params.push(nimi);
    }

    return utils.executeSQL(query, params);
}


const deleteArea = (id) => {
    let query = `DELETE FROM alue WHERE alue_id = ? `;
    return utils.executeSQL(query, [id]);
}



module.exports = {
    isExists,

    insert: (nimi) => {
        return insertArea(nimi);
    },

    fetch: (alue_id, nimi) => {
        return fetchArea(alue_id, nimi);
    },

    delete: (id) => {
        return deleteArea(id);
    },
}