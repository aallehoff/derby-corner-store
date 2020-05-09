'use strict'

const client = new Vue({
    el: '#client',
    mixins: [validation],
    data: {
        currentErrors: [],
        newItem: {},
        results: '',
        showCreationDialog: false,
        showResults: true,
        showWelcomeMsg: true
    },
    methods: {
        createItem: async function () {
            this.validateItem(this.newItem)
            if (client.currentErrors.length != 0) {
                // errors present, do nothing
            } else {
                await fetch('/stock', {
                    mode: 'same-origin',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newItem)
                })
                .then((response) => {
                    if (response.ok) {
                        this.newItem = {} // clear input
                        this.showCreationDialog = false
                        this.readAll()
                    } else {
                        response.json().then((listOfErrors) => {
                            client.currentErrors = listOfErrors
                        })
                    }
                })
                .catch(() => {
                    client.currentErrors = ["Couldn't connect to the server. Try again later."]
                })
                // .then(() => {
                    // this.newItem = {} // clear input
                    // this.showCreationDialog = false
                    // this.readAll()
                // })
            }
        },
        readAll: async function () {
            await fetch('/stock', { mode: 'same-origin' })
                    .then((response) => {
                        // Is the status code less than 400 ?
                        if (response.ok) {
                            // If so, update results.
                            response.json().then((data) => {
                                client.results = data
                            })
                        } else {
                            // If not, update errors.
                            response.json().then((listOfErrors) => {
                                client.currentErrors = listOfErrors
                            })
                        }
                    })
                    .catch(() => {
                        client.currentErrors = ["Couldn't connect to the server. Try again later."]
                    })
        }
    },
    mounted: function () {
        // This function is called by Vue once the view is ready.
        this.readAll()
    }
})