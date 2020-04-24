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
// READ all items
router.get('/stock/all', (req, res) => {
    placeholderResponse(req, res)
})

// CREATE new item
router.post('/stock/item', (req, res) => {
    placeholderResponse(req, res)
})

// READ, UPDATE, DELETE specific item
router.route('/stock/item/:upc')
    .get((req, res) => {
        placeholderResponse(req, res)
    })
    .put((req, res) => {
        placeholderResponse(req, res)
    })
    .delete((req, res) => {
        placeholderResponse(req, res)
    })

module.exports = router