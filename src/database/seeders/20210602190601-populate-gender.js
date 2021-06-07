'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('gender', 
    [
      {
        description: 'Masculino',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Feminino',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Outro',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('gender', null, {});
  }
};
