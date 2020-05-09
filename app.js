'use strict'
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const { sequelize, Item } = require('./db')
const routes = require('./routes')
const bodyParser = require('body-parser').json()
const seedData = require('./db/seed/seed.json')

// Break early if there is an error loading dotenv.
if (dotenv.error) {
    throw dotenv.error
    console.error("App: error loading .env file.")
}

const port = process.env.APP_PORT

/* 
    Middleware
*/

app.use(bodyParser)

// Attach router.
app.use('/', routes)

// Serve static files.
app.use(express.static('public'))

// Fallback route.
app.use((req, res) => {
    res.status(404).send('File not find, sorry!')
})

/* 
    Startup Sequence

    1.) Test connection to database
    2.) Forcibly(!) sync database
    3.) Load seed data into database
    4.) Start web server
*/

// Startup database and server.
sequelize
    .authenticate() // Test connection to database
    .then(() => {
        // Forcibly(!) sync database
        console.log('App: authenticated connection to database.')
        sequelize.sync({force: true}) // DROP TABLE IF EXISTS
            .then(() => {
                    // Load seed data into database
                    Item.bulkCreate(seedData).then(() => {
                            // Start web server
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
