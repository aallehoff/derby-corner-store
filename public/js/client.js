'use strict'

const client = new Vue({
    el: '#client',
    data: {
        currentErrors: [],
        newItem: {},
        results: '',
        showCreationDialog: false,
        showResults: true
    },
    methods: {
        createItem: async function () {
            this.validateItem(this.newItem)
            if (this.currentErrors.length != 0) {
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
        },
        validateLength: function (field, fieldName) {
            if (!field) {
                throw this.ValidationError(fieldName, 'Must not be empty', 'more than 0 characters', '0')
            } else {
                const len = field.length
                if (len > 255 || len < 1) {
                    throw this.ValidationError(fieldName, 'Invalid length', 'less than 256 and more than 0', field.length)
                }
            }
        },
        validateItem: function (item) {
            this.currentErrors = [] // clear existing errors
            const routine = [
                { run: this.validateUPC, on: item.upc, fieldName: 'UPC' },
                { run: this.validateLength, on: item.productMfg, fieldName: 'Manufacturer' },
                { run: this.validateLength, on: item.productName, fieldName: 'Name' },
                { run: this.validateSign, on: item.quantityOnHand, fieldName: 'Quantity' },
                { run: this.validateSign, on: item.price, fieldName: 'Price' }
            ]
            for (const r of routine) {
                try {
                    // Assemble function calls with arguments
                    r.run(r.on, r.fieldName)
                } catch (err) {
                    // Accumulate errors
                    this.currentErrors.push(err)
                }
            }
        },
        validateSign: function (field, fieldName) {
            const num = Number(field)
            if ( num < 0 ) {
                throw this.ValidationError(fieldName, 'Invalid sign', 'positive number', num)
            }
        },
        validateUPC: function (upc, fieldName) {
            const re = /^\d{12}$/u // Exactly 12 digits, unicode.

            // Fail early if no field UPC is blank.
            if (!upc) {
                throw this.ValidationError(fieldName, 'UPC must not be blank.', 'UPC', 'nothing')
            }

            if (re.test(upc)) {
                // Intialize checks.
                let actualCheck = upc[11]
                let expectedCheck

                // Create buffers.
                let sumEvenDigits = 0
                let sumOddDigits = 0

                // Populate buffers.
                for (let i = 0; i < 11; i++) {
                    // Walk through UPC excluding the final (check) digit.
                    const n = Number(upc[i])
                    console.log(n)
                    if ( i % 2 ) {
                        // Odd digits result in a truthy (non-zero) remainder.
                        sumOddDigits += n
                    } else {
                        // Even digits result in a falsy (zero) remiander.
                        sumEvenDigits += n
                    }
                }

                // Calculate expected check.
                const remainder = ((sumEvenDigits * 3) + sumOddDigits) % 10
                if ( remainder ) {
                    expectedCheck = 10 - remainder
                } else {
                    expectedCheck = 0
                }

                // Compare actual to expected check.
                if (actualCheck == expectedCheck) {
                    // valid UPC; no action needed
                } else {
                    throw this.ValidationError(fieldName, 'Invalid check digit', expectedCheck, actualCheck)
                }
            } else {
                throw this.ValidationError(fieldName, 'Invalid length', 12, upc.length)
            }
        },
        ValidationError: function (loc, msg, exp, act) {
            return new Error(`(${loc}) ${msg}; expected ${exp}, got ${act}.`)
        }
    },
    mounted: function () {
        // This function is called by Vue once the view is ready.
        this.readAll()
    }
})