// The contents of this mixin file are imported into other component's namespace.
const validation = {
    methods: {
        validateLength: function (field, fieldName) {
            // Does field exist and is it less than 255 characters long?
            if (!field) {
                throw this.ValidationError(`${fieldName} must not be empty.`)
            } else {
                const len = field.length
                if (len > 255) {
                    throw this.ValidationError(`${fieldName} must be less than 255 characters long.`)
                }
            }
        },
        validateItem: function (item) {
            /* 
                Main validation method.
                Note: currentErrors is a property of the 'client' component, not 'this'.
            */
            client.currentErrors = [] // clear existing errors
            // Build routine.
            const routine = [
                { run: this.validateUPC, on: item.upc, fieldName: 'UPC' },
                { run: this.validateLength, on: item.productMfg, fieldName: 'Manufacturer' },
                { run: this.validateLength, on: item.productName, fieldName: 'Name' },
                { run: this.validateSign, on: item.quantityOnHand, fieldName: 'Quantity' },
                { run: this.validateSign, on: item.price, fieldName: 'Price' },
                { run: this.rejectLargeNumbers, on: item.quantityOnHand, fieldName: 'Quantity' },
                { run: this.rejectLargeNumbers, on: item.price, fieldName: 'Price' },
                { run: this.rejectNonNumbers, on: item.quantityOnHand, fieldName: 'Quantity' },
                { run: this.rejectNonNumbers, on: item.price, fieldName: 'Price' }
            ]
            for (const r of routine) {
                try {
                    // Assemble function calls with arguments
                    r.run(r.on, r.fieldName)
                } catch (err) {
                    // Accumulate errors
                    client.currentErrors.push(err)
                }
            }
        },
        validateSign: function (field, fieldName) {
            // Is the field a positive number?
            const num = Number(field)
            if ( num < 0 ) {
                throw this.ValidationError(`${fieldName} must be a positive number.`)
            }
        },
        validateUPC: function (upc, fieldName) {
            /*
                UPC Validation

                Implements: https://www.gs1.org/services/how-calculate-check-digit-manually 
                Note: the gs1 algorithm is 1-indexed, this implementation is 0-indexed.
            */
            const re = /^\d{12}$/u // Exactly 12 digits, unicode.

            // Fail early if no field UPC is blank.
            if (!upc) {
                throw this.ValidationError(`Invalid UPC. Enter the UPC exactly as it appears on the product.`)
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
                    throw this.ValidationError(`Invalid UPC. Enter the UPC exactly as it appears on the product.`)
                }
            } else {
                throw this.ValidationError(`Invalid UPC. Must be exactly twelve digits long.`)
            }
        },
        rejectLargeNumbers: function (field, fieldName) {
            // Is the field less than an arbitrary number?
            if (fieldName === 'Quantity') {
                if (field > 999 ) {
                    throw this.ValidationError(`${fieldName} must be less than or equal to 999.`)
                } 
            } else if (fieldName === 'Price') {
                if (field > 999.99 ) {
                    throw this.ValidationError(`${fieldName} must be less than or equal to $999.99.`)
                } 
            }
        },
        rejectNonNumbers: function (field, fieldName) {
            // Is the number blank?
            if (field === undefined) {
                throw this.ValidationError(`${fieldName} may not be blank.`)
            }
        },
        ValidationError: function (msg) {
            // A custom error for validation routines.
            return new Error(`${msg}`)
        }
    }
}