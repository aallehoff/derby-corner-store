'use strict'

const express = require('express')
const router = express.Router()
const db = require('../db')

// function placeholderResponse(req, res) {
//     console.dir(req.body)
//     res.send(`Received ${req.method} to ${req.route.path}.
//     Body:
//     ${JSON.stringify(req.body)}`)
// }

function catcher (req, res) {
    return (err) => {
        // Is the error produced by Sequelize?
        if (err.errors) {
            // If so, accumulate into a list and send with 400.
            const listOfErrors = []
            for (let e of err.errors) {
                listOfErrors.push(`(${e.path}) ${e.type}: ${e.message}`)
            }
            res.status(400).send(listOfErrors)
        } else {
            // If not, end with 500.
            console.error(err)
            res.status(500).end()
        }
    }
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
            .catch(catcher(req, res))
    })
    // CREATE new item
    .post(async (req, res) => {
        await db.Item.create({
            upc: req.body.upc,
            productMfg: req.body.productMfg,
            productName: req.body.productName,
            quantityOnHand: req.body.quantityOnHand,
            price: req.body.price
        })
            .then(() => {
                res.status(200).end()
            })
            .catch(catcher(req, res))
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
        .catch(catcher(req, res))
    })
    // UPDATE single item
    .put(async (req, res) => {
        await db.Item.findByPk(req.body.id)
        .then(async (item) => {
            await item.update({
                upc: req.body.upc,
                productMfg: req.body.productMfg,
                productName: req.body.productName,
                quantityOnHand: req.body.quantityOnHand,
                price: req.body.price
            })
            .then(() => {
                res.status(200).end()
            })
            .catch(catcher(req, res))
        })
        .catch(catcher(req, res))
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
                    .catch(catcher(req, res))
            })
            .catch(catcher(req, res))
    })

/* 
    Exports
*/

module.exports = router