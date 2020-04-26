'use strict'
const express = require('express')
const router = express.Router()
const db = require('../models')

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
router.get('/stock/all', async (req, res) => {
    await db.Item.findAll()
        .then((data) => {
            res.json(data)
        })
})

// CREATE new item
router.post('/stock/item', async (req, res) => {
    await db.Item.create({
        upc: req.body.upc,
        productMfg: req.body.productMfg,
        productName: req.body.productName,
        quantityOnHand: req.body.quantityOnHand,
        priceInCents: req.body.priceInCents
    })
        .then(() => {
            res.status(200)
                .end()
        })
})

// READ, UPDATE, DELETE specific item
router.route('/stock/item/:upc')
    .get(async (req, res) => {
        await db.Item.findOne({
            where: {
                upc: req.params.upc
            }
        })
        .then((data) => {
            res.json(data)
        })
    })
    .put((req, res) => {
        placeholderResponse(req, res)
    })
    .delete(async (req, res) => {
        await db.Item.findOne({
            where: {
                upc: req.params.upc
            }
        })
            .then(async (item) => {
                await item.destroy()
                    .then(() => {
                        res.status(200).end()
                    })
            })
    })

module.exports = router