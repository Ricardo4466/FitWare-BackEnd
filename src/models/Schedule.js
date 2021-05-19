const { Model, DataTypes } = require("sequelize");

class Schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.DATEONLY,
        hour: DataTypes.STRING,
        limit_person: DataTypes.STRING,
        duration: DataTypes.STRING,
      },
      {
        tableName: "schedules",
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.TraningCategory, {
      through: "schedule_category",
    });
  }
}

module.exports = Schedule;
