'use strict'
const express = require('express')
const app = express()
const { sequelize, Item } = require('./models')
const routes = require('./routes')
const bodyParser = require('body-parser').json()

const port = 3000

app.use(bodyParser)

// Attach router
app.use('/', routes)

// Startup database and server.
sequelize
    // Test connection to database
    .authenticate()
    .then(() => {
        console.log('App: authenticated connection to database.')
        sequelize.sync({force: true}) // DROP TABLE IF EXISTS
            .then(() => {
                    Item.bulkCreate([
                        {
                            upc: '859610005973',
                            productMfg: 'Blue Buffalo',
                            productName: 'Blue Wilderness Small Breed Adult Dog Food Chicken',
                            quantityOnHand: 1,
                            priceInCents: 2499
                        },
                        {
                            upc: '818200918243',
                            productMfg: 'Hills',
                            productName: 'Science Diet Adult Dog Food Chicken Sensitive',
                            quantityOnHand: 1,
                            priceInCents: 3799
                        }
                    ]).then(() => {
                            // Start Express server
                            app.listen(port, () => {
                            console.log(`App: server listening on port ${port}`)
                        })
                })
            })
            .catch((err) => {
                console.error('App: failed to sync tables to database', err)
            })
    })
    .catch((err) => {
        console.error('App: failed to authenticate connection to database.', err)
    })
