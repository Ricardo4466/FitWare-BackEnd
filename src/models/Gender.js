const { Model, DataTypes } = require("sequelize");

class Gender extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
      },
      {
        tableName: "gender",
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.UserStudent, { foreignKey: "student_id"});
  }
}

module.exports = Gender;
