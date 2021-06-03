'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ShowcaseItems', [{
      ItemId: 1,
      ShowcaseId: 1,
      isStarred: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ItemId: 2,
      ShowcaseId: 1,
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ItemId: 3,
      ShowcaseId: 1,
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ItemId: 4,
      ShowcaseId: 1,
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ItemId: 5,
      ShowcaseId: 1,
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ItemId: 6,
      ShowcaseId: 2,
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ItemId: 7,
      ShowcaseId: 3,
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
