const { Model, DataTypes } = require("sequelize");

class Schedules extends Model {
  static init(sequelize) {
    super.init(
      {
        link: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {}
}

module.exports = Schedules;
