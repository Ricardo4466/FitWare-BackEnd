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
        tableName: "personal_trainers",
        sequelize,
      }
    );
  }

  static associate(models) { 
    this.belongsTo(models.AdministratorAcademy, { foreignKey: "academy_id" });
  }
}

module.exports = PersonalTrainer;
