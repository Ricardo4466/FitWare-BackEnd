const { Model, DataTypes } = require("sequelize");

class TraningCategory extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
      },
      {
        tableName: "Traning_categories",
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Schedule, {
      through: "schedule_category",
});
  }
}

module.exports = TraningCategory;
