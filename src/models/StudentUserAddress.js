const { Model, DataTypes } = require("sequelize");

class StudentUserAddress extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: DataTypes.STRING,
        street: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
      },
      {
        tableName: "student_address",
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.UserStudent, {through: "user_student_address"});
  }
}

module.exports = StudentUserAddress;
