
const db = require('../db/db.js')
const jwt = require('jsonwebtoken')


let login = async (req, res, next) => {

    console.log('loging in.....')
    let user = await checkUserCredentials(req.body)
    let token = await genereteToken(user)
    user.TOKEN = token
    await saveToken(user)
    req.LoggedUser = user

    next()

}

let checkUserCredentials = async (body) => {
    ///get the user from the database
    let userResult = await db.promise().query('SELECT * FROM `users` WHERE `EMAIL` = ? AND `PASSWORD` = ?', [body.email.toString(), body.password.toString()], function (err, results) {
        return results
    })
    let data = (userResult[0][0])
    data = JSON.parse(JSON.stringify(data))
    delete data.PASSWORD
    delete data.REGISTERED_ON
    delete data.ID
    delete data.ROLE
    return data
}


let genereteToken = async (user) => {
    const token = jwt.sign({ id: user.USER_ID.toString() }, 'AppfOrAntiNo')
    return token
}

let saveToken = async (user) => {
    let result = await db.promise().query('UPDATE `users` SET `TOKEN`=? WHERE `EMAIL` = ? AND `USER_ID` = ?',
        [user.TOKEN.toString(), user.EMAIL.toString(), user.USER_ID.toString()], function (err, results) {
            return results
        })
}

module.exports = login;