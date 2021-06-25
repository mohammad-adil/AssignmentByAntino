const db = require('../db/db.js')
const verifyUser = require('../middleware/verifyUser.js')


let deleteClass = async (req, res, next) => {

    let verify = await verifyUser(req.UID, (result) => {
        const userData = result
        if (userData.ROLE == 'admin') {
            deleteItem(req.body.PRODUCT_ID)
            res.status(200).send({ Message: "Item Deleted" })
        }

        else return res.status(401).send({ error: "only admins Can Delete products" })

    })

}


let deleteItem = async (ID) => {
    try {
        let sql = "DELETE FROM products WHERE PRODUCT_ID='" + ID + "'"
        console.log(sql)

        db.query(sql, function (err, result) {
            if (err) return err;
            else next()
        });
    } catch (err) {
        res.status(500).send('Something is Wrong')

    }
}


module.exports = deleteClass