const { Model, DataTypes } = require("sequelize");

class AddressAcademy extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: DataTypes.STRING,
        streat: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
      },
      {
        tableName: "address_academy",
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Academy);
  }
}

module.exports = AddressAcademy;
