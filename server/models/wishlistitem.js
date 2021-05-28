'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WishlistItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WishlistItem.belongsTo(models.User)
    }
  };
  WishlistItem.init({
    UserId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    tag: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'WishlistItem',
  });
  return WishlistItem;
};