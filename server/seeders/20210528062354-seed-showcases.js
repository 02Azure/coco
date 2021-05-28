'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Showcases', [{
      UserId: '',
      name: '',
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: '',
      name: '',
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: '',
      name: '',
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }])

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Showcases', null, {})
  }
};
