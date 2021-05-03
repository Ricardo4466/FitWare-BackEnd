const { Model, Datatypes, DataTypes } = require("sequelize");

class Schedules extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.STRING,
        hour: DataTypes.STRING,
        limitPerson: DataTypes.STRING,
        duration: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {}
}

module.exports = Schedules;
