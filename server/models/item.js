'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User)
      Item.hasMany(models.ShowcaseItem)
    }
  };
  Item.init({
    UserId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "name cannot be empty"
        }
      }
    },
    image: {
      type: DataTypes.STRING
    },
    tradeable: {
      type: DataTypes.BOOLEAN
    },
    price: {
      type: DataTypes.INTEGER
    },
    tradeWith: {
      type: DataTypes.STRING
    },
    tag: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};