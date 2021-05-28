'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ShowcaseItems', [{
      ItemId: 1,
      ShowcaseId: 1,
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    , {
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
    }
  ])

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ShowcaseItems', null, {})
  }
};
