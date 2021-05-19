"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("schedule_category", {
      schedule_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "schedules",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      traning_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Traning_categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("schedule_category");
  },
};
