'use strict'

const client = new Vue({
    el: '#client',
    data: {
        results: '',
        showResults: true
    },
    mounted: async () => {
        await fetch('/stock', { mode: 'same-origin' })
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                    console.log(response)
                    client.results = response
                })
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
        submitEdit: (item) => {
            const target = '/stock/' + item.upc
            fetch(target, {
                mode: 'same-origin',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
        }
    },
    template: /*html*/`
        <div>
            <tr v-if="!editMode">
                <td>{{ item.upc }}</td>
                <td>{{ item.productMfg }}</td>
                <td>{{ item.productName }}</td>
                <td>{{ item.quantityOnHand }}</td>
                <td>{{ '$' + item.priceInCents / 10 }}</td>
                <td>
                    <button v-on:click="editMode = true">Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
            <tr v-if="editMode">
                <td><input v-model="item.upc"></td>
                <td><input v-model="item.productMfg"></td>
                <td><input v-model="item.productName"></td>
                <td><input v-model="item.quantityOnHand"></td>
                <td><input v-model="item.priceInCents"></td>
                <td>
                    <button v-on:click="editMode = false">Cancel</button>
                    <button v-on:click="submitEdit(item); editMode = false">Submit</button>
                </td>
            </tr>
        </div>
    `
})