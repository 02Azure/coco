'use strict';
const  hashPassword  = require('../helpers/hashPassword')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'test',
      password: hashPassword('abc123'),
      email: 'a',
      userDesc: 'b',
      location: 'c',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,{
      username: '',
      password: hashPassword('abc123'),
      email: '',
      userDesc: '',
      location: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
