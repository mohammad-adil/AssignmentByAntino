const db = require('../db/db.js')
const express = require('express')
const mysql = require('mysql2')
const validate = require('../validation/validateUserData.js')
const registerUser = require('../middleware/registerUser.js')
const login = require('../middleware/login.js')
const addProduct = require('../middleware/addProduct.js')
const deleteProduct = require('../middleware/deleteProduct.js')
const updateProduct = require('../middleware/updateProduct.js')
const seeAll = require('../middleware/seeAll.js')

const auth = require('../middleware/auth.js')

const router = new express.Router()


router.post('/', async (req, res) => {

    res.status(200).json({ msg: 'HomeJam' });

});

router.post('/register', validate, registerUser, async (req, res) => {

    res.status(200).send('User Created')

})

router.post('/login', login, async (req, res) => {

    res.status(200).json(req.LoggedUser)

})

router.post('/addProduct', auth, addProduct, async (req, res) => {
})

router.delete('/deleteProduct', auth, deleteProduct, async (req, res) => {
    res.status(200).send('Product Deleted')
})

router.patch('/updateProduct', auth, updateProduct, async (req, res) => {

})

router.get('/seeAll', auth, seeAll, async (req, res) => {

})


module.exports = router