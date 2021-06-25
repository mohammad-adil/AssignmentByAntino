const db = require('../db/db.js')

let verifyUser = async function (UID, callback) {

    let sql = db.query(
        'SELECT `NAME`, `EMAIL`,`ROLE`,`USER_ID`, `TOKEN` FROM `users` WHERE `USER_ID` = ?',
        [UID],
        function (err, results) {
            if (err) res.status(404).send({ error: "Not Found" })
            else return callback(results[0])
        }
    );

}


module.exports = verifyUser