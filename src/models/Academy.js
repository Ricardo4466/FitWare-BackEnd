const { Model, DataTypes } = require("sequelize");

class Academy extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        telefone: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        tableName: "academy",
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasOne(models.AddressAcademy, { foreignKey: "academy_id" });
    this.hasOne(models.PersonalTrainer, { foreignKey: "academy_id" });
  }
}

module.exports = Academy;
