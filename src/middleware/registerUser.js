const db = require('../db/db.js')

const registerUser = async (req, res, next) => {
    let uniqueID = await pID(req.user.name);
    const user = req.user
    let sql = ''
    let userRole = user.role

    if (userRole == 'admin' || userRole == 'user') {
        sql = "INSERT INTO users (NAME,EMAIL,PASSWORD,PHONE,ROLE,USER_ID) VALUES ('" + user.name + "','" + user.email + "','" + user.password + "','" + user.phone + "','" + userRole + "','" + uniqueID + "')";

    } else {

        userRole = 'user'
        sql = "INSERT INTO users (NAME,EMAIL,PASSWORD,PHONE,ROLE,USER_ID) VALUES ('" + user.name + "','" + user.email + "','" + user.password + "','" + user.phone + "','" + userRole + "','" + uniqueID + "')";
    }

    console.log(sql)


    try {

        db.query(sql, function (err, result) {
            if (err) return err;
            else next()
        });
    } catch (err) {

        res.status(500).send('Something is Wrong')

    }


}


let pID = async (name) => {

    return name.substr(0, 4) + Math.random().toString(36).substr(8, 9);
}

module.exports = registerUser