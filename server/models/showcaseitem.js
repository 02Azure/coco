'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShowcaseItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShowcaseItem.belongsTo(models.Item)
      ShowcaseItem.belongsTo(models.Showcase)
    }
  };
  ShowcaseItem.init({
    ItemId: DataTypes.INTEGER,
    ShowcaseId: DataTypes.INTEGER,
    isStarred: {
      type: DataTypes.BOOLEAN
    }
  }, {
    hooks: {
      beforeCreate: (showcaseItem, options) => {
        if(showcaseItem.isStarred === undefined) showcaseItem.isStarred = false
      }
    },
    sequelize,
    modelName: 'ShowcaseItem',
  });
  return ShowcaseItem;
};