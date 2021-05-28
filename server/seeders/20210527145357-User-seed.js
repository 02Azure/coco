'use strict';
const  hashPassword  = require('../helpers/hashPassword')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'siotong',
      password: hashPassword('abc123'),
      email: 'otong@mail.com',
      userDesc: 'Hanyalah seorang pemuda yang mengoleksi kertas karton yugioh',
      location: 'Stardew Valley',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,{
      username: 'lilynano',
      password: hashPassword('lalalili'),
      email: 'lilynano@mail.com',
      userDesc: 'new Co&Co passionate collector', //default value?
      location: 'Zuzu City',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
