'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [{
      UserId: 1,
      name: 'a',
      image: 'b',
      tradeable: true,
      price: 10,
      tradeWith: 'c',
      tag: 'd',
      description: 'e',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,{
      UserId: '',
      name: '',
      image: '',
      tradeable: true,
      price: 0,
      tradeWith: '',
      tag: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: '',
      name: '',
      image: '',
      tradeable: true,
      price: 0,
      tradeWith: '',
      tag: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: '',
      name: '',
      image: '',
      tradeable: true,
      price: 0,
      tradeWith: '',
      tag: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: '',
      name: '',
      image: '',
      tradeable: true,
      price: 0,
      tradeWith: '',
      tag: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {})
  }
};
