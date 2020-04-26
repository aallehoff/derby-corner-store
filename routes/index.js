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
    Create, Read, Update, Delete (CRUD) Routes
*/

router.route('/stock')
    // READ all items
    .get(async (req, res) => {
        await db.Item.findAll()
            .then((data) => {
                res.json(data)
            })
    })
    // CREATE new item
    .post(async (req, res) => {
        await db.Item.create({
            upc: req.body.upc,
            productMfg: req.body.productMfg,
            productName: req.body.productName,
            quantityOnHand: req.body.quantityOnHand,
            priceInCents: req.body.priceInCents
        })
            .then(() => {
                res.status(200).end()
            })
    })

router.route('/stock/:upc')
    // READ single item
    .get(async (req, res) => {
        await db.Item.findOne({
            where: { upc: req.params.upc }
        })
        .then((data) => {
            res.json(data)
        })
    })
    // UPDATE single item
    .put(async (req, res) => {
        await db.Item.findOne({
            where: { upc: req.params.upc }
        })
        .then(async (item) => {
            await item.update({
                upc: req.body.upc,
                productMfg: req.body.productMfg,
                productName: req.body.productName,
                quantityOnHand: req.body.quantityOnHand,
                priceInCents: req.body.priceInCents
            })
            .then(() => {
                res.status(200).end()
            })
        })
    })
    // DELETE single item
    .delete(async (req, res) => {
        await db.Item.findOne({
            where: { upc: req.params.upc }
        })
            .then(async (item) => {
                await item.destroy()
                    .then(() => {
                        res.status(200).end()
                    })
            })
    })

module.exports = router