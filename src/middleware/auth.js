const jwt = require('jsonwebtoken')
const db = require("../db/db.js")

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'AppfOrAntiNo')
        req.UID = decoded.id

        next()

    } catch (e) {
        res.status(401).send({ error: "Please Authenticate" })
    }
}

module.exports = auth