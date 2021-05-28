'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showcase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Showcase.belongsTo(models.User)
      Showcase.hasMany(models.ShowcaseItem)
    }
  };
  Showcase.init({
    UserId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING
    },
    isStarred: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Showcase',
  });
  return Showcase;
};