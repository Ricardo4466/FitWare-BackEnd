'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('contact_type', 
    [
      {
        description: 'Residêncial',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Comercial',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Celular',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contact_type', null, {});
  }
};
