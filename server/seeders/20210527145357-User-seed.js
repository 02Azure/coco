'use strict';
const  hashPassword  = require('../helpers/hashPassword')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: '',
      passowrd: hashPassword('abc123'),
      email: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: '',
      passowrd: hashPassword('abc123'),
      email: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
