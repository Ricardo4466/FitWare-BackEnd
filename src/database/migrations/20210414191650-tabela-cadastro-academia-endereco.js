'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   queryInterface.createTable('address_academy', {
    id:{
      type:Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cep:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    street:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    state:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    city:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at:{
      type: Sequelize.DATE,
      allowNull:false,
    },
    updated_at:{
      type: Sequelize.DATE,
      allowNull:false,
    }
   });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('address_academy');
  }
};