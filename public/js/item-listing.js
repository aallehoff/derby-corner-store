'use strict'

Vue.component('item-listing', {
    props: ['item'],
    mixins: [validation],
    data: function() {
        return {
            editMode: false
        }
    },
    methods: {
        submitEdit: async function (item) {
            this.validateItem(item)
            if (client.currentErrors.length != 0) {
                // errors present on client, do nothing
            } else {
                const target = '/stock/' + item.upc
                await fetch(target, {
                    mode: 'same-origin',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                })
                .then((response) => {
                    if (response.ok) {
                        this.$emit('refresh-results')
                    } else {
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
            .then((response) => {
                if (response.ok) {
                    this.$emit('refresh-results')
                } else {
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
    template: /*html*/`
        <tr>
            <td><span class="mobile">UPC:</span><input v-model="item.upc" v-bind:disabled="!editMode" class="form-control upc" type="number" min="0" max="999999999999"></td>
            <td><span class="mobile">Manufacturer:</span><input v-model="item.productMfg" v-bind:disabled="!editMode" class="form-control" size="12" maxlength="255"></td>
            <td><span class="mobile">Description:</span><input v-model="item.productName" v-bind:disabled="!editMode" class="form-control" size="35" maxlength="255"></td>
            <td><span class="mobile">Quantity:</span><input type="number" v-model="item.quantityOnHand" v-bind:disabled="!editMode" class="form-control" min="0" max="999" step="1"></td>
            <td>
                <span class="mobile">Price:</span><div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="number" v-model="item.price" size="2" v-bind:disabled="!editMode" class="form-control" min="0" max="999.99" step="0.01">
                </div>
            </td>
            <td>
                <span class="mobile">Actions:<br></span>
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