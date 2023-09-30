//-IMPORTS---------------------------------------------------------->
var mysql = require('mysql');
//-------------------------------------------------------------------


//-SQL-CONNECTION--------------------------------------------------->
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Projekt_2'
});
//-------------------------------------------------------------------


const executeSQL = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, function (error, results, fields) {
            error ? reject(error) : resolve(results);
        });
    })
}


const executeGetSingleSQL = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, function (error, results, fields) {
            error ? reject(error) : resolve(results.length > 0 ? results[0] : null);
        });
    })
}



module.exports = {
    executeSQL,
    executeGetSingleSQL
}