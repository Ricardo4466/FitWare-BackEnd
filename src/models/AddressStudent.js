const { Model, DataTypes } = require("sequelize");

class AddressStudent extends Model {
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
    this.belongsTo(models.UserStudent);
  }
}

module.exports = AddressStudent;
