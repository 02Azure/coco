'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Showcases', [{
      UserId: 1,
      name: 'Si atk tak terhingga',
      isStarred: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,{
      UserId: 1,
      name: "Most Valued",
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 2,
      name: 'Kolpri Gunpla',
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Showcases', null, {})
  }
};
