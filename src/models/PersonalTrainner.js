const { Model, DataTypes } = require("sequelize");

class PersonalTrainer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        specialty: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {}
}

module.exports = PersonalTrainer;
