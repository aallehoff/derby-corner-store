'use strict'

/*
  Define and export the Item model.
*/

module.exports = (sequelize, Sequelize) => {
  class Item extends Sequelize.Model {}
  Item.init({
    upc: {
      type: Sequelize.STRING(12),
      unique: true, // No duplicate entries.
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [12, 12] // UPCs are exactly 12 characters long.
      }
    },
    productMfg: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [0, 255]
      }
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [0, 255]
      }
    },
    quantityOnHand: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
        max: 999
      }
    },
    price: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
        max: 999.99
      }
    }
  }, {sequelize})
  return Item
}