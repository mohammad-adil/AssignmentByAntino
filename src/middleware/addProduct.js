const db = require('../db/db.js')
const verifyUser = require('../middleware/verifyUser.js')




let addProduct = async (req, res, next) => {
    let body = req.body
    let ProductID = await productID(body.PRODUCT_NAME)

    let verify = await verifyUser(req.UID, (result) => {
        const userData = result
        if (userData.ROLE == 'admin') {
            insertItem(body, ProductID)
            res.status(200).send({ Message: "Product Added" })
        }

        else return res.status(401).send({ error: "only admins Can add products" })

    })




}

let productID = async (name) => {

    return name.substr(0, 4) + Math.random().toString(36).substr(8, 9);
}





let insertItem = async (body, ProductID) => {

    try {

        let sql = await db.promise().query('INSERT INTO `products` (PRODUCT_NAME, PRODUCT_DESCRIPTION,PRODUCT_QUANTITY,PRODUCT_PRICE,PRODUCT_ID) VALUES(?,?,?,?,?)',
            [
                body.PRODUCT_NAME.toString(),
                body.PRODUCT_DESCRIPTION.toString(),
                body.PRODUCT_QUANTITY,
                body.PRODUCT_PRICE,
                ProductID
            ])
    } catch (err) {

        console.log(err)

    }

}



module.exports = addProduct