//-IMPORTS---------------------------------------------------------->
var utils = require('./utils/dbutils');
//-------------------------------------------------------------------


const fetchSinglePostinro = (postinro) => {
    const query = "SELECT postinro, toimipaikka FROM posti WHERE postinro = ?";
    return utils.executeGetSingleSQL(query, [postinro])
}

const insertPosti = (postinro, toimipaikka) => {
    console.log("Postinumero SQL insert " + postinro + "/" + toimipaikka);
    const query = "INSERT INTO posti (postinro, toimipaikka) VALUES (?, ?)";
    return utils.executeSQL(query, [postinro, toimipaikka])
}



module.exports = {
    fetchSinglePostinro,
    insertPosti,
}