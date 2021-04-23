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

//   static associate(models) {
//     this.belongsToMany(models.UserStudent, {through: "student_academy"});
//     this.belongsTo(models.AddressAcademy);
//   }
}

module.exports = Academy;