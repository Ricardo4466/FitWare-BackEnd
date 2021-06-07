const { Model, DataTypes } = require("sequelize");

class TraningCategorie extends Model {
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
      through: "schedule_category", foreignKey: "traning_category_id"
});
  }
}

module.exports = TraningCategorie;
