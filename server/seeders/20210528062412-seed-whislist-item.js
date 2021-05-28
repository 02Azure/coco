'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('WhislistItems', [{
      UserId: '',
      name: '',
      image: '',
      description: '',
      price: 0,
      tag: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
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
    }])

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('WhislistItems', null, {})
  }
};
