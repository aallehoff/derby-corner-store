'use strict'

const client = new Vue({
    el: '#client',
    data: {
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