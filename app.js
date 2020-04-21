'use strict'
const express = require('express')
const app = express()
const sequelize = require('./models').sequelize

const port = 3000

app.get('/', (req, res) => {
    res.send('test response')
})

// Startup database and server.
sequelize
    // Test connection to database
    .authenticate()
    .then(() => {
        console.log('App: authenticated connection to database.')
        // Start Express server
        app.listen(port, () => {
            console.log(`App: server listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.error('App: failed to authenticate connection to database.', err)
    })
