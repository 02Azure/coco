'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ShowcaseItems', [{
      ItemId: '',
      ShowcaseId: '',
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ItemId: '',
      ShowcaseId: '',
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ItemId: '',
      ShowcaseId: '',
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ItemId: '',
      ShowcaseId: '',
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ItemId: '',
      ShowcaseId: '',
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }])

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ShowcaseItems', null, {})
  }
};
