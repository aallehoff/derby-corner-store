'use strict'

module.exports = (sequelize, Sequelize) => {
  class Item extends Sequelize.Model {}
  Item.init({
    upc: {
      type: Sequelize.STRING(12),
      unique: true,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [12, 12]
      }
    },
    productMfg: {
      type: Sequelize.STRING,
      allowNull: false
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantityOnHand: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
    },
    price: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0
      }
    }
  }, {sequelize})
  return Item
}