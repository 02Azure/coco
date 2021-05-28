'use strict';
const {
  Model
} = require('sequelize');
const hashPassword = require('../helpers/hashPassword')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Item)
      User.hasMany(models.Showcase)
      User.hasMany(models.WishlistItem)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password cannot be Empty'
        },
        len: {
          args: 6,
          msg: 'Password must be 6 Character or more'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Format email is Invalid'
        }
      }
    },
    userDesc: DataTypes.STRING,
    userImage: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeBulkCreate(user, option){
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};