'use strict'
const express = require('express')
const router = express.Router()

function placeholderResponse(req, res) {
    console.dir(req.body)
    res.send(`Received ${req.method} to ${req.route.path}.
    Body:
    ${JSON.stringify(req.body)}`)
}

/* 
    Client Routes
*/
router.get('/', (req, res) => {
    res.redirect('/client')
})
router.get('/client', (req, res) => {
    res.send('Client goes here.') //todo
})


/* 
    Create, Read, Update, Delete (CRUD) Routes
*/
router.get('/stock/all', (req, res) => {
    placeholderResponse(req, res)
})

router.route('/stock/item/:upc')
    .get((req, res) => {
        placeholderResponse(req, res)
    })
    .post((req, res) => {
        placeholderResponse(req, res)
    })
    .put((req, res) => {
        placeholderResponse(req, res)
    })
    .delete((req, res) => {
        placeholderResponse(req, res)
    })

module.exports = router