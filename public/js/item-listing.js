'use strict'

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
            <td><input v-model="item.upc" size="12" v-bind:disabled="!editMode" class="form-control" max-length="12"></td>
            <td><input v-model="item.productMfg" size="12" v-bind:disabled="!editMode" class="form-control" max-length="255"></td>
            <td><input v-model="item.productName" size="35" v-bind:disabled="!editMode" class="form-control" max-length="255"></td>
            <td><input type="number" v-model="item.quantityOnHand" v-bind:disabled="!editMode" class="form-control" min="0" max="999" step="1"></td>
            <td>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="number" v-model="item.price" size="2" v-bind:disabled="!editMode" class="form-control" min="0" max="999.99" step="0.01">
                </div>
            </td>
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