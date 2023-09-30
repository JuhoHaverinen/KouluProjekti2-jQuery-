const createErrorMessage = (res, message) => {
    res.statusCode = 400;
    res.json({ statusid: "NOT OK", message: message })
}



module.exports = {
    createErrorMessage
}