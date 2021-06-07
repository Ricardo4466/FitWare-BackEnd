const { Model, DataTypes } = require("sequelize");

class Schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.DATEONLY,
        hour: DataTypes.STRING,
        limit_person: DataTypes.STRING,
        duration: DataTypes.STRING,
        is_remote: DataTypes.BOOLEAN,
        link: DataTypes.STRING,
        personal_name: DataTypes.STRING
      },
      {
        tableName: "schedules",
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.TraningCategory, {through: "schedule_category"});
    this.belongsToMany(models.UserStudent, {through: "schedule_student"});

  }
}

module.exports = Schedule;
