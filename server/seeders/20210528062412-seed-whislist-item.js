'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('WishlistItems', [{
      UserId: 1,
      name: 'a',
      image: 'b',
      description: 'c',
      price: 10,
      tag: 'd',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,{
      name: '',
      image: '',
      description: '',
      price: 0,
      tag: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '',
      image: '',
      description: '',
      price: 0,
      tag: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('WishlistItems', null, {})
  }
};
