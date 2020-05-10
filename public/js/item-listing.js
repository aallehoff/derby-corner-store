'use strict'

// Child instance of client
Vue.component('item-listing', {
    props: ['item'],
    mixins: [validation], // Loads validation methods into this component's namespace.
    data: function() {
        return {
            editMode: false
        }
    },
    methods: {
        cancelEdit: async function (item) {
            /*
                Revert changes to item if edit is canceled.
            */
            await fetch(`/stock/${item.id}`, { mode: 'same-origin' })
            .then((response) => {
                // Is the status code less than 400 ?
                if (response.ok) {
                    // If so, update item.
                    response.json().then((data) => {
                        this.item = data
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
        submitEdit: async function (item) {
            /*
                Update
            */

            // Validate.
            this.validateItem(item)

            // Send request to server.
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
                    // Is status code less than 400?
                    if (response.ok) {
                        // If so, refresh items.
                        this.$emit('refresh-results')
                        this.editMode = false;
                    } else {
                        // If not, update errors and cancel edit.
                        response.json().then((listOfErrors) => {
                            client.currentErrors = listOfErrors
                            this.cancelEdit(item)
                        })
                    }
                })
                .catch(() => {
                    client.currentErrors = ["Couldn't connect to the server. Try again later."]
                })
            }
        },
        deleteItem: async function (item) {
            /*
                Delete
            */

            // Send request to server
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
                // Is status code less than 400?
                if (response.ok) {
                    // If so, refresh results.
                    this.$emit('refresh-results')
                } else {
                    //If not, update errors.
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
            <!-- Template for displaying and editing item data. -->
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
                v-on:click="editMode ? cancelEdit(item) : ()=>{} ; editMode = !editMode;" 
                >{{ editMode ? 'Cancel' : 'Edit' }}</button> <!-- Change behavior based on value of editMode. -->
                <button
                class="btn"
                v-bind:class="{ 'btn-primary': editMode, 'btn-danger': !editMode }"
                v-on:click="editMode ? submitEdit(item) : deleteItem(item)"
                >{{ editMode ? 'Submit' : 'Delete' }}</button><!-- Change behavior based on value of editMode. -->
            </td>
        </tr>
    `
})