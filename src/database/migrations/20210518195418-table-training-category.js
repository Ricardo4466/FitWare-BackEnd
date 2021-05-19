'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("Traning_categories",
   {
      id:
      {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      description:
      {
        type: Sequelize.STRING,
        allowNull:false
      },
      created_at:
      {
        type: Sequelize.DATE,
        allowNull:false,
      },
      updated_at:
      {
        type: Sequelize.DATE,
        allowNull:false,
      }
   });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('Traning_categories');
  }
};
