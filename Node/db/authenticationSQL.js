//-IMPORTS---------------------------------------------------------->
var utils = require('./utils/dbutils');
//-------------------------------------------------------------------



const fetchLogin = ({ login, password }) => {
    let params = [];
    let query = `SELECT admin FROM authentication WHERE 1 = 1 `;

    if (login && password) {
        query += ` AND login = '${login}' AND password = '${password}' `;
        params.push(login, password);
    }
    return utils.executeSQL(query, params)
}



module.exports = {
    fetch: (login, password) => {
        return fetchLogin(login, password);
    },
}