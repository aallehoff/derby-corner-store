'use strict'

const client = new Vue({
    el: '#client',
    data: {
        errors: [],
        newItem: {},
        results: '',
        showCreationDialog: false,
        showResults: true
    },
    methods: {
        createItem: async function () {
            console.log(this.newItem)
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
        validateItem: function (item) {
            try {
                this.validateUPC(item.upc)
            } catch (error) {
                
            }
        },
        validateUPC: function (upc) {
            const re = /\d{12}/u // Exactly 12 digits, unicode.

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
                    console.log(`Check digit validation success.`)
                } else {
                    console.log(`Invalid check digit: expected ${expectedCheck}, got ${actualCheck}.`)
                }
            } else {
                console.log('Must be exactly 12 digits')
            }
        }
    },
    mounted: function () {
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
                this.$emit('refresh-results')
            })
        }
    },
    template: /*html*/`
        <tr>
            <td><input v-model="item.upc" v-bind:disabled="!editMode"></td>
            <td><input v-model="item.productMfg" v-bind:disabled="!editMode"></td>
            <td><input v-model="item.productName" v-bind:disabled="!editMode"></td>
            <td><input v-model="item.quantityOnHand" v-bind:disabled="!editMode"></td>
            <td><input v-model="item.priceInCents" v-bind:disabled="!editMode"></td>
            <td>
                <button v-on:click="editMode = !editMode">{{ editMode ? 'Cancel' : 'Edit' }}</button>
                <button v-on:click="editMode ? submitEdit(item) : deleteItem(item); editMode = false">
                    {{ editMode ? 'Submit' : 'Delete' }}
                </button>
            </td>
        </tr>
    `
})