'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [{
      UserId: 1,
      name: 'Exodia the Forbidden One UR LOB',
      image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155781.jpg',
      tradeable: false,
      price: 700000,
      tradeWith: '',
      tag: 'Yugioh-TCG',
      description: 'Unlimited Edition, Near Mint Condition, masih wangy!',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,{
      UserId: 1,
      name: 'Right Leg of the Forbidden One UR LOB',
      image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155848.jpg',
      tradeable: true,
      price: 300000,
      tradeWith: 'Playmat Yugioh San Diego Comic-Con Exclusive Yugi & Exodia Playmat',
      tag: 'Yugioh-TCG',
      description: 'Unli, NM',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 1,
      name: 'Left Leg of the Forbidden One UR LOB',
      image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155814.jpg',
      tradeable: false,
      price: 0,
      tradeWith: '',
      tag: 'Yugioh-TCG',
      description: 'Unli, played',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 1,
      name: 'Right Arm of the Forbidden One UR LOB',
      image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155847.jpg',
      tradeable: true,
      price: 300000,
      tradeWith: 'Cash only',
      tag: 'Yugioh-TCG',
      description: 'Unli, played',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 1,
      name: 'Left Arm of the Forbidden One UR LOB',
      image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155813.jpg',
      tradeable: false,
      price: 300000,
      tradeWith: '',
      tag: 'Yugioh-TCG',
      description: 'Unli, NM',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 1,
      name: 'Uria, Lord of Searing Flames UtR SOI',
      image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/334866.jpg',
      tradeable: false,
      price: 3000000,
      tradeWith: '',
      tag: 'Yugioh-TCG',
      description: '1st Edition, NM',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 2,
      name: 'Gandum ZZ Ver Ka MG',
      image: 'https://gaijin-gunpla.com/wp-content/uploads/2017/10/IMG_2008.jpg',
      tradeable: true,
      price: 500000,
      tradeWith: 'tukar tambah dengan doto2 set mini figure',
      tag: 'gunpla',
      description: 'standard build, BiB',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 2,
      name: 'Jakiro Doto2',
      image: 'https://i.etsystatic.com/25024575/r/il/92726b/2653063865/il_570xN.2653063865_ivbf.jpg',
      tradeable: false,
      price: 0,
      tradeWith: '',
      tag: 'figure',
      description: 'mini figure set',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {})
  }
};
