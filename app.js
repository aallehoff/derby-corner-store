'use strict'
const express = require('express')
const app = express()
const sequelize = require('./models').sequelize
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
                // Start Express server
                app.listen(port, () => {
                    console.log(`App: server listening on port ${port}`)
                })
            })
            .catch((err) => {
                console.error('App: failed to sync tables to database', err)
            })
    })
    .catch((err) => {
        console.error('App: failed to authenticate connection to database.', err)
    })
