"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("user_student_address", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      student_address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "student_address",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    queryInterface.dropTable("user_student_address", {});
  },
};
