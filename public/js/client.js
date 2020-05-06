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
            console.log(this.newItem)
            this.validateItem(this.newItem)
            if (this.currentErrors.length > 0) {
                // no errors, proceed
            } else {
                await fetch('/stock', {
                    mode: 'same-origin',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newItem)
                })
                .then(() => {
                    this.newItem = {} // clear input
                    this.showCreationDialog = false
                    this.readAll()
                })
            }
        },
        readAll: async function () {
            await fetch('/stock', { mode: 'same-origin' })
                    .then((response) => {
                        return response.json()
                    })
                    .then((response) => {
                        console.log(response)
                        client.results = response
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

Vue.component('item-listing', {
    props: ['item'],
    data: function() {
        return {
            editMode: false
        }
    },
    methods: {
        submitEdit: async function (item) {
            const target = '/stock/' + item.upc
            await fetch(target, {
                mode: 'same-origin',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            .then(() => {
                this.$emit('refresh-results')
            })
        },
        deleteItem: async function (item) {
            const target = '/stock/' + item.upc
            await fetch(target, {
                mode: 'same-origin',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            .then(() => {
                // Signal parent that it's time to refresh the results.
                this.$emit('refresh-results')
            })
        }
    },
    template: /*html*/`
        <tr>
            <td><input v-model="item.upc" size="12" v-bind:disabled="!editMode"></td>
            <td><input v-model="item.productMfg" size="20" v-bind:disabled="!editMode"></td>
            <td><input v-model="item.productName" size="50" v-bind:disabled="!editMode"></td>
            <td><input v-model="item.quantityOnHand" size="5" v-bind:disabled="!editMode"></td>
            <td><input v-model="item.price" size="12" v-bind:disabled="!editMode"></td>
            <td>
                <button
                class="btn"
                v-bind:class="{ 'btn-info': !editMode, 'btn-secondary': editMode }"
                v-on:click="editMode = !editMode" 
                >{{ editMode ? 'Cancel' : 'Edit' }}</button>
                <button
                class="btn"
                v-bind:class="{ 'btn-primary': editMode, 'btn-danger': !editMode }"
                v-on:click="editMode ? submitEdit(item) : deleteItem(item); editMode = false"
                >{{ editMode ? 'Submit' : 'Delete' }}</button>
            </td>
        </tr>
    `
})