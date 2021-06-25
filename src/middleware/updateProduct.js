const db = require('../db/db.js')
const verifyUser = require('../middleware/verifyUser.js')


let updateProduct = async (req, res, next) => {

    let verify = await verifyUser(req.UID, (result) => {
        const userData = result
        if (userData.ROLE == 'admin') {
            updateDetails(req.body)
            res.status(200).send({ Message: "Item Updated" })
        }

        else return res.status(401).send({ error: "only admins Can Update products" })

    })


}


let updateDetails = async (data) => {
    try {
        db.query(
            'UPDATE `products` SET `PRODUCT_DESCRIPTION`=?, `PRODUCT_QUANTITY` =?, `PRODUCT_PRICE` =?  WHERE  `PRODUCT_ID` = ?',
            [data.PRODUCT_DESCRIPTION, data.PRODUCT_QUANTITY, data.PRODUCT_PRICE, data.PRODUCT_ID],
            function (err, results) {
                if (results) return results
            }
        );

    } catch (err) {
        console.log(err)


    }


}

module.exports = updateProduct