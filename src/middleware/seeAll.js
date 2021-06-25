const db = require('../db/db.js')
const verifyUser = require('../middleware/verifyUser.js')

let seeAll = async (req, res, next) => {
    await verifyUser(req.UID, (result) => {
        const userData = result
    })

    await getAllData((result) => {

        let data = result
        res.status(200).send({ products: data })
    })
}


let getAllData = async (callback) => {
    let sql = "SELECT PRODUCT_NAME,PRODUCT_PRICE FROM products";
    db.query(sql, function (err, result) {
        if (err) return err;
        else return callback(result)
    });
}

module.exports = seeAll