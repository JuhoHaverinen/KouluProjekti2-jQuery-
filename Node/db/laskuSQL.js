//-IMPORTS---------------------------------------------------------->
var utils = require('./utils/dbutils');
//-------------------------------------------------------------------



const fetchLasku = ({ lasku_id, varaus_id, asiakas_id, asiakas, summa, completed }) => {
    let params = [];
    let query = `SELECT l.lasku_id, l.varaus_id,l.summa, l.erapaiva,l.completed, a.paperilasku,a.sahkopostilasku, v.varattu_pvm  
        FROM lasku l, asiakas a, varaus v WHERE l.varaus_id=v.varaus_id AND v.asiakas_asiakas_id=a.asiakas_id `;

    if (lasku_id) {
        query += ` AND lasku_id = ? `;
        params.push(lasku_id);
    }
    if (varaus_id) {
        query += ` AND v.varaus_id = ? `;
        params.push(varaus_id);
    }
    if (completed) {
        query += ` AND completed = ${completed} `;
    }
    console.log("Hae laskut: " + query + ", " + lasku_id);
    return utils.executeSQL(query, params)
}


const fetchLatest = () => {
    let params = [];
    let query = `SELECT lasku_id, varaus_id,erapaiva
    FROM lasku WHERE lasku_id =  (select max(lasku_id) from lasku) `;
    console.log("Hae laskut: " + query);
    return utils.executeSQL(query, params)
}


const deleteLasku = (lasku_id) => {
    let query = `DELETE FROM lasku WHERE lasku_id = ? `;
    return utils.executeSQL(query, [lasku_id]);
}


const deleteLaskuByVarausId = (varaus_id) => {
    let query = `DELETE FROM lasku WHERE varaus_id = ? `;
    return utils.executeSQL(query, [varaus_id]);
}


const insertLasku = ({ varaus_id, summa, alv, erapaiva }) => {
    let query = `INSERT INTO lasku (varaus_id, summa, alv, erapaiva, completed)
                 VALUES (?, ?, ?, ADDDATE(SYSDATE(), INTERVAL 10 DAY), ?) `;
    console.log(query);
    return utils.executeSQL(query, [varaus_id, summa, alv, false])
}


const updateLasku = ({ varaus_id, summa, alv, erapaiva, completed, avain }) => {
    let query = `UPDATE lasku SET varaus_id=?, summa=?, alv=?, erapaiva=?, completed=? 
                 WHERE lasku_id=? `;
    return utils.executeSQL(query, [varaus_id, summa, alv, erapaiva, completed, avain])
}



module.exports = {

    fetch: (lasku_id, varaus_id, asiakas_id, asiakas, summa, completed) => {
        return fetchLasku(lasku_id, varaus_id, asiakas_id, asiakas, summa, completed);
    },
    fetchLatest: () => {
        return fetchLatest();
    },

    deleteLaskuByVarausId: (varaus_id) => {
        return deleteLaskuByVarausId(varaus_id);
    },

    delete: (varaus_id) => {
        return deleteLasku(varaus_id);
    },

    insert: (varaus_id, summa, alv, erapaiva) => {
        return insertLasku(varaus_id, summa, alv, erapaiva);
    },

    update: (varaus_id, summa, alv, erapaiva, completed, avain) => {
        return updateLasku(varaus_id, summa, alv, erapaiva, completed, avain);
    },
}