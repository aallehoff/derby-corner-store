'use strict'
const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('./index.js')

class Item extends Model {}
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
  priceInCents: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 0
    }
  }
}, {sequelize})

module.exports = Item

// module.exports = (sequelize, DataTypes) => {
//   const Item = sequelize.define('Item', {
//     upc: DataTypes.STRING,
//     name: DataTypes.STRING,
//     quantity: DataTypes.INTEGER,
//     priceInCents: DataTypes.INTEGER,
//     desc: DataTypes.STRING
//   }, {});
//   Item.associate = function(models) {
//     // associations can be defined here
//   };
//   return Item;
// };