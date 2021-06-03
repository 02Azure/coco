'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('WishlistItems', [{
      UserId: 1,
      name: 'Blue-Eyes Ultimate Dragon ScR JUMP',
      image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/208963.jpg',
      description: 'Hanya menerima versi JUMP. Harga Fixed',
      price: 600000,
      tag: 'Yugioh TCG',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,{
      UserId: 1,
      name: 'Any Playmat Official Konami WCS Final',
      image: '',
      description: 'Kondisi masih bagus',
      price: 450000,
      tag: 'TCG accessories',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('WishlistItems', null, {})
  }
};
