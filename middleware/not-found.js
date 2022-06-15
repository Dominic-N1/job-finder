const notFound = (req, res) =>
    res.status(404).send("<h1>Route does not found. Try another one!</h1>");

module.exports = notFound;
