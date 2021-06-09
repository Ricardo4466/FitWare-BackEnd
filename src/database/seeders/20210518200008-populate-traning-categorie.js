'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Traning_categories', 
    [
      {
        description: 'Treino de força',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Treino de definição',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Treino de hipertrofia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Treino cardio',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Treino de resistência muscular',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Treinamento intervalado de alt intensidade (HIIT)',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Treino terapêutico',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'YÔGA',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Condicionamento físico para idosos',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Abdominais',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'ZUMBA',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'POWER JUMP',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'ALONGAMENTO',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'MUAY-THAI',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'POWER LOCAL',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Traning_categories', null, {});
  }
};
