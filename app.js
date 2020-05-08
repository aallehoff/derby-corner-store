'use strict'
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const { sequelize, Item } = require('./db')
const routes = require('./routes')
const bodyParser = require('body-parser').json()

// Break early if there is an error loading dotenv.
if (dotenv.error) {
    throw dotenv.error
    console.error("App: error loading .env file.")
}

const port = process.env.APP_PORT

/* 
    MIDDLEWARE
*/

app.use(bodyParser)

// Attach router.
app.use('/', routes)

// Serve static files.
app.use(express.static('public'))

/* 
    STARTUP SEQUENCE
*/

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
                            price: 24.99
                        },
                        {
                            upc: '818200918243',
                            productMfg: 'Hills',
                            productName: 'Science Diet Adult Dog Food Chicken Sensitive',
                            quantityOnHand: 1,
                            price: 37.99
                        }
                    ]).then(() => {
                            // Start Express server
                            app.listen(port, () => {
                            console.log(`App: server running at http://localhost:${port}/`)
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
