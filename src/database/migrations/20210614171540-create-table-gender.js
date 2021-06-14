'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("gender",
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
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user_students",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    queryInterface.dropTable('gender');
  }
};
